<?php
/**
 * Plugin Name: VitalHealth Tools
 * Plugin URI:  https://vitalhealthhub.com
 * Description: Adds 50 health calculators and 100 SEO-optimised blog posts to VitalHealth Hub. Includes admin dashboard, Rank Math SEO meta, JSON-LD schema, and safe importers.
 * Version:     1.0.0
 * Author:      Ali Haider
 * Author URI:  https://www.linkedin.com/in/ali-haider-seo-consultant/
 * License:     GPL-2.0+
 * Text Domain: vitalhealth-tools
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'VHT_VERSION',   '1.0.0' );
define( 'VHT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'VHT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'VHT_PLUGIN_FILE', __FILE__ );

require_once VHT_PLUGIN_DIR . 'includes/helpers.php';
require_once VHT_PLUGIN_DIR . 'includes/calculators-registry.php';
require_once VHT_PLUGIN_DIR . 'includes/calculators-importer.php';
require_once VHT_PLUGIN_DIR . 'includes/blog-importer.php';
require_once VHT_PLUGIN_DIR . 'includes/seo-meta.php';
require_once VHT_PLUGIN_DIR . 'includes/schema-markup.php';
require_once VHT_PLUGIN_DIR . 'includes/admin-dashboard.php';

class VitalHealth_Tools {

    public function __construct() {
        add_action( 'init',              [ $this, 'register_shortcodes' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_assets' ] );
        add_action( 'wp_head',           [ $this, 'output_schema' ] );
        add_action( 'admin_post_vht_import_calculators', [ $this, 'handle_import_calculators' ] );
        add_action( 'admin_post_vht_import_blog',        [ $this, 'handle_import_blog' ] );
        add_action( 'admin_post_vht_flush_permalinks',   [ $this, 'handle_flush_permalinks' ] );
        register_activation_hook( VHT_PLUGIN_FILE, [ $this, 'activate' ] );
    }

    public function register_shortcodes() {
        add_shortcode( 'vh_calculator', [ $this, 'render_calculator' ] );
    }

    public function render_calculator( $atts ) {
        $atts = shortcode_atts( [ 'id' => '' ], $atts, 'vh_calculator' );
        $id   = sanitize_key( $atts['id'] );
        if ( ! $id ) return '<p class="vht-error">Calculator ID missing.</p>';

        $file = VHT_PLUGIN_DIR . 'calculators/' . $id . '.php';
        if ( ! file_exists( $file ) ) {
            return '<p class="vht-error">Calculator <code>' . esc_html( $id ) . '</code> not found.</p>';
        }

        ob_start();
        include $file;
        return ob_get_clean();
    }

    public function enqueue_assets() {
        wp_enqueue_style(
            'vht-styles',
            VHT_PLUGIN_URL . 'assets/css/vitalhealth-tools.css',
            [],
            VHT_VERSION
        );
        wp_enqueue_script(
            'vht-scripts',
            VHT_PLUGIN_URL . 'assets/js/vitalhealth-tools.js',
            [],
            VHT_VERSION,
            true
        );
    }

    public function output_schema() {
        vht_output_schema();
    }

    public function handle_import_calculators() {
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Not allowed.' );
        check_admin_referer( 'vht_import_calculators' );
        vht_import_all_calculators();
        wp_redirect( admin_url( 'admin.php?page=vitalhealth-tools&imported=calculators' ) );
        exit;
    }

    public function handle_import_blog() {
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Not allowed.' );
        check_admin_referer( 'vht_import_blog' );
        vht_import_all_blog_posts();
        wp_redirect( admin_url( 'admin.php?page=vitalhealth-tools&imported=blog' ) );
        exit;
    }

    public function handle_flush_permalinks() {
        if ( ! current_user_can( 'manage_options' ) ) wp_die( 'Not allowed.' );
        check_admin_referer( 'vht_flush_permalinks' );
        flush_rewrite_rules();
        wp_redirect( admin_url( 'admin.php?page=vitalhealth-tools&flushed=1' ) );
        exit;
    }

    public function activate() {
        vht_create_blog_categories();
        flush_rewrite_rules();
    }
}

new VitalHealth_Tools();
