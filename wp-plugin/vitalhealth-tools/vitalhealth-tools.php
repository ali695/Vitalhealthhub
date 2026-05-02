<?php
/**
 * Plugin Name:  VitalHealth Tools
 * Plugin URI:   https://vitalhealthhub.com
 * Description:  Adds 50 health calculators and 100 SEO-optimised blog posts to VitalHealth Hub. Includes admin dashboard, Rank Math SEO meta, JSON-LD schema, and safe idempotent importers.
 * Version:      1.0.0
 * Author:       Ali Haider
 * Author URI:   https://www.linkedin.com/in/ali-haider-seo-consultant/
 * License:      GPL-2.0+
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  vitalhealth-tools
 * Domain Path:  /languages
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'VHT_VERSION',    '1.0.0' );
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

if ( ! class_exists( 'VitalHealth_Tools' ) ) :

class VitalHealth_Tools {

    public function __construct() {
        add_action( 'init',               [ $this, 'register_shortcodes' ] );
        add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );
        add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
        add_action( 'wp_head',            [ $this, 'output_schema' ] );
        add_action( 'admin_post_vht_import_calculators', [ $this, 'handle_import_calculators' ] );
        add_action( 'admin_post_vht_import_blog',        [ $this, 'handle_import_blog' ] );
        add_action( 'admin_post_vht_flush_permalinks',   [ $this, 'handle_flush_permalinks' ] );
        register_activation_hook( VHT_PLUGIN_FILE, [ $this, 'on_activate' ] );
        register_deactivation_hook( VHT_PLUGIN_FILE, [ $this, 'on_deactivate' ] );
    }

    /** Register the [vh_calculator id="..."] shortcode. */
    public function register_shortcodes() {
        add_shortcode( 'vh_calculator', [ $this, 'render_calculator' ] );
    }

    /** Render a calculator shortcode by loading the matching PHP template. */
    public function render_calculator( $atts ) {
        $atts = shortcode_atts( [ 'id' => '' ], $atts, 'vh_calculator' );
        $id   = sanitize_key( $atts['id'] );

        if ( ! $id ) {
            return '<p class="vht-error">' . esc_html__( 'Calculator ID missing.', 'vitalhealth-tools' ) . '</p>';
        }

        $file = VHT_PLUGIN_DIR . 'calculators/' . $id . '.php';

        if ( ! file_exists( $file ) ) {
            return '<p class="vht-error">' . sprintf(
                esc_html__( 'Calculator "%s" not found.', 'vitalhealth-tools' ),
                esc_html( $id )
            ) . '</p>';
        }

        ob_start();
        include $file;
        return ob_get_clean();
    }

    /** Enqueue CSS and JS on the public-facing site. */
    public function enqueue_frontend_assets() {
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

    /** Enqueue admin-specific CSS on the plugin dashboard page. */
    public function enqueue_admin_assets( $hook ) {
        if ( strpos( $hook, 'vitalhealth-tools' ) === false ) {
            return;
        }
        wp_enqueue_style(
            'vht-admin-styles',
            VHT_PLUGIN_URL . 'assets/css/vitalhealth-tools.css',
            [],
            VHT_VERSION
        );
    }

    /** Output JSON-LD schema in <head>. */
    public function output_schema() {
        vht_output_schema();
    }

    /** Handle calculator import form submission. */
    public function handle_import_calculators() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'You do not have permission to do this.', 'vitalhealth-tools' ) );
        }
        check_admin_referer( 'vht_import_calculators' );
        vht_import_all_calculators();
        wp_safe_redirect( admin_url( 'admin.php?page=vitalhealth-tools&imported=calculators' ) );
        exit;
    }

    /** Handle blog import form submission. */
    public function handle_import_blog() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'You do not have permission to do this.', 'vitalhealth-tools' ) );
        }
        check_admin_referer( 'vht_import_blog' );
        vht_import_all_blog_posts();
        wp_safe_redirect( admin_url( 'admin.php?page=vitalhealth-tools&imported=blog' ) );
        exit;
    }

    /** Handle flush-permalinks form submission. */
    public function handle_flush_permalinks() {
        if ( ! current_user_can( 'manage_options' ) ) {
            wp_die( esc_html__( 'You do not have permission to do this.', 'vitalhealth-tools' ) );
        }
        check_admin_referer( 'vht_flush_permalinks' );
        flush_rewrite_rules();
        wp_safe_redirect( admin_url( 'admin.php?page=vitalhealth-tools&flushed=1' ) );
        exit;
    }

    /**
     * Activation hook — lightweight only.
     * Creates blog categories and flushes rewrite rules.
     * Does NOT auto-import content; use the admin dashboard Import Tools tab.
     */
    public function on_activate() {
        vht_create_blog_categories();
        flush_rewrite_rules();
    }

    /** Deactivation hook — flush rewrite rules so slugs are removed cleanly. */
    public function on_deactivate() {
        flush_rewrite_rules();
    }
}

new VitalHealth_Tools();

endif; // class_exists guard
