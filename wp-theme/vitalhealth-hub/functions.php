<?php
/**
 * VitalHealth Hub — Theme Functions
 */
if ( ! defined( 'ABSPATH' ) ) exit;

define( 'VHH_VERSION',   '1.0.0' );
define( 'VHH_THEME_DIR', get_template_directory() );
define( 'VHH_THEME_URI', get_template_directory_uri() );

/* ── Theme Setup ───────────────────────────────────────────────── */
function vhh_setup() {
    load_theme_textdomain( 'vitalhealth-hub', VHH_THEME_DIR . '/languages' );

    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'automatic-feed-links' );
    add_theme_support( 'html5', [
        'search-form', 'comment-form', 'comment-list',
        'gallery', 'caption', 'style', 'script',
    ] );
    add_theme_support( 'custom-logo', [
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true,
    ] );
    add_theme_support( 'customize-selective-refresh-widgets' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );

    add_image_size( 'vhh-card',   600, 380, true );
    add_image_size( 'vhh-hero',   1200, 600, true );
    add_image_size( 'vhh-thumb',  80,  80,  true );

    register_nav_menus( [
        'primary'      => esc_html__( 'Primary Navigation', 'vitalhealth-hub' ),
        'footer-left'  => esc_html__( 'Footer — Calculators', 'vitalhealth-hub' ),
        'footer-mid'   => esc_html__( 'Footer — Guides', 'vitalhealth-hub' ),
        'footer-right' => esc_html__( 'Footer — Company', 'vitalhealth-hub' ),
    ] );
}
add_action( 'after_setup_theme', 'vhh_setup' );

/* ── Content Width ────────────────────────────────────────────── */
function vhh_content_width() {
    $GLOBALS['content_width'] = 820;
}
add_action( 'after_setup_theme', 'vhh_content_width', 0 );

/* ── Enqueue Assets ───────────────────────────────────────────── */
function vhh_enqueue_assets() {
    wp_enqueue_style(
        'vhh-google-fonts',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap',
        [],
        null
    );
    wp_enqueue_style(
        'vhh-theme',
        VHH_THEME_URI . '/assets/css/theme.css',
        [ 'vhh-google-fonts' ],
        VHH_VERSION
    );
    wp_enqueue_script(
        'vhh-theme',
        VHH_THEME_URI . '/assets/js/theme.js',
        [],
        VHH_VERSION,
        true
    );
    if ( is_singular() && comments_open() ) {
        wp_enqueue_script( 'comment-reply' );
    }
}
add_action( 'wp_enqueue_scripts', 'vhh_enqueue_assets' );

/* ── Widget Areas ─────────────────────────────────────────────── */
function vhh_register_sidebars() {
    $shared = [
        'before_widget' => '<div id="%1$s" class="vhh-sidebar-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3>',
        'after_title'   => '</h3>',
    ];
    register_sidebar( array_merge( $shared, [
        'name' => esc_html__( 'Blog Sidebar', 'vitalhealth-hub' ),
        'id'   => 'sidebar-blog',
    ] ) );
    register_sidebar( array_merge( $shared, [
        'name' => esc_html__( 'Calculator Sidebar', 'vitalhealth-hub' ),
        'id'   => 'sidebar-calculator',
    ] ) );
    register_sidebar( array_merge( $shared, [
        'name' => esc_html__( 'Footer — Column 1', 'vitalhealth-hub' ),
        'id'   => 'footer-1',
    ] ) );
    register_sidebar( array_merge( $shared, [
        'name' => esc_html__( 'Footer — Column 2', 'vitalhealth-hub' ),
        'id'   => 'footer-2',
    ] ) );
}
add_action( 'widgets_init', 'vhh_register_sidebars' );

/* ── Custom Logo / Fallback ───────────────────────────────────── */
function vhh_logo_html() {
    ob_start();
    if ( has_custom_logo() ) {
        the_custom_logo();
    } else { ?>
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="vhh-logo-link" rel="home" aria-label="<?php bloginfo( 'name' ); ?>">
            <img
                src="<?php echo esc_url( get_template_directory_uri() . '/assets/images/logo.png' ); ?>"
                alt="<?php echo esc_attr( get_bloginfo( 'name' ) ); ?>"
                class="vhh-default-logo"
                height="46"
                loading="eager"
            >
        </a>
    <?php }
    return ob_get_clean();
}

/* ── Breadcrumbs ──────────────────────────────────────────────── */
function vhh_breadcrumbs() {
    if ( is_front_page() ) return;
    $sep = '<span class="sep" aria-hidden="true">›</span>';
    echo '<nav class="vhh-breadcrumbs" aria-label="' . esc_attr__( 'Breadcrumb', 'vitalhealth-hub' ) . '">';
    echo '<a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'vitalhealth-hub' ) . '</a>';
    if ( is_singular( 'post' ) ) {
        $cats = get_the_category();
        if ( $cats ) {
            echo $sep . '<a href="' . esc_url( get_category_link( $cats[0]->term_id ) ) . '">' . esc_html( $cats[0]->name ) . '</a>';
        }
        echo $sep . '<span aria-current="page">' . esc_html( get_the_title() ) . '</span>';
    } elseif ( is_singular( 'page' ) ) {
        $parent = wp_get_post_parent_id( get_the_ID() );
        if ( $parent ) {
            echo $sep . '<a href="' . esc_url( get_permalink( $parent ) ) . '">' . esc_html( get_the_title( $parent ) ) . '</a>';
        }
        echo $sep . '<span aria-current="page">' . esc_html( get_the_title() ) . '</span>';
    } elseif ( is_category() ) {
        echo $sep . '<span aria-current="page">' . esc_html( single_cat_title( '', false ) ) . '</span>';
    } elseif ( is_archive() ) {
        echo $sep . '<span aria-current="page">' . esc_html( get_the_archive_title() ) . '</span>';
    } elseif ( is_search() ) {
        echo $sep . '<span>' . esc_html__( 'Search Results', 'vitalhealth-hub' ) . '</span>';
    }
    echo '</nav>';
}

/* ── Reading Time ─────────────────────────────────────────────── */
function vhh_reading_time( $post_id = null ) {
    $content = get_post_field( 'post_content', $post_id );
    $words   = str_word_count( wp_strip_all_tags( $content ) );
    $mins    = max( 1, (int) round( $words / 230 ) );
    return sprintf( esc_html( _n( '%d min read', '%d min read', $mins, 'vitalhealth-hub' ) ), $mins );
}

/* ── Excerpt Length ───────────────────────────────────────────── */
function vhh_excerpt_length() { return 22; }
add_filter( 'excerpt_length', 'vhh_excerpt_length' );

function vhh_excerpt_more() {
    return '&hellip;';
}
add_filter( 'excerpt_more', 'vhh_excerpt_more' );

/* ── Body Classes ─────────────────────────────────────────────── */
function vhh_body_classes( $classes ) {
    if ( ! is_singular() ) $classes[] = 'is-archive';
    if ( is_singular( 'page' ) ) {
        $calc_id = get_post_meta( get_the_ID(), '_vht_calculator_id', true );
        if ( $calc_id ) $classes[] = 'is-calculator-page';
    }
    return $classes;
}
add_filter( 'body_class', 'vhh_body_classes' );

/* ── Page Templates ───────────────────────────────────────────── */
function vhh_page_templates( $templates ) {
    $templates['templates/full-width.php']      = esc_html__( 'Full Width', 'vitalhealth-hub' );
    $templates['templates/no-sidebar.php']      = esc_html__( 'No Sidebar', 'vitalhealth-hub' );
    return $templates;
}
add_filter( 'theme_page_templates', 'vhh_page_templates' );

/* ── Add defer to non-critical scripts ───────────────────────── */
function vhh_script_attributes( $tag, $handle ) {
    $defer = [ 'vhh-theme' ];
    if ( in_array( $handle, $defer, true ) ) {
        return str_replace( ' src', ' defer src', $tag );
    }
    return $tag;
}
add_filter( 'script_loader_tag', 'vhh_script_attributes', 10, 2 );

/* ── Post navigation within same category ─────────────────────── */
function vhh_post_nav() {
    $prev = get_previous_post( true );
    $next = get_next_post( true );
    if ( ! $prev && ! $next ) return;
    echo '<nav class="vhh-post-nav" aria-label="' . esc_attr__( 'Post navigation', 'vitalhealth-hub' ) . '">';
    if ( $prev ) {
        echo '<a href="' . esc_url( get_permalink( $prev ) ) . '" class="vhh-post-nav-item">';
        echo '<span class="vhh-post-nav-label">&#8592; ' . esc_html__( 'Previous', 'vitalhealth-hub' ) . '</span>';
        echo '<span class="vhh-post-nav-title">' . esc_html( get_the_title( $prev ) ) . '</span>';
        echo '</a>';
    } else {
        echo '<span></span>';
    }
    if ( $next ) {
        echo '<a href="' . esc_url( get_permalink( $next ) ) . '" class="vhh-post-nav-item">';
        echo '<span class="vhh-post-nav-label">' . esc_html__( 'Next', 'vitalhealth-hub' ) . ' &#8594;</span>';
        echo '<span class="vhh-post-nav-title">' . esc_html( get_the_title( $next ) ) . '</span>';
        echo '</a>';
    }
    echo '</nav>';
}

/* ── Related Posts ────────────────────────────────────────────── */
function vhh_related_posts( $count = 3 ) {
    $cats    = wp_get_post_categories( get_the_ID(), [ 'fields' => 'ids' ] );
    if ( empty( $cats ) ) return;
    $related = get_posts( [
        'category__in'   => $cats,
        'post__not_in'   => [ get_the_ID() ],
        'posts_per_page' => $count,
        'orderby'        => 'rand',
    ] );
    if ( empty( $related ) ) return;
    echo '<section class="vhh-section-sm"><div class="vhh-section-header"><h2>' . esc_html__( 'Related Articles', 'vitalhealth-hub' ) . '</h2></div>';
    echo '<div class="vhh-blog-grid">';
    foreach ( $related as $p ) {
        vhh_post_card( $p );
    }
    echo '</div></section>';
}

/* ── Post Card Template ───────────────────────────────────────── */
function vhh_post_card( $post ) {
    $cats     = get_the_category( $post->ID );
    $cat_name = $cats ? $cats[0]->name : '';
    $cat_url  = $cats ? get_category_link( $cats[0]->term_id ) : '#';
    $thumb    = get_the_post_thumbnail_url( $post->ID, 'vhh-card' );
    ?>
    <article class="vhh-post-card">
        <?php if ( $thumb ) : ?>
            <img src="<?php echo esc_url( $thumb ); ?>" alt="<?php echo esc_attr( get_the_title( $post->ID ) ); ?>" class="vhh-post-card-thumb" loading="lazy" width="600" height="380">
        <?php else : ?>
            <div class="vhh-post-card-thumb-placeholder" aria-hidden="true">📰</div>
        <?php endif; ?>
        <div class="vhh-post-card-body">
            <div class="vhh-post-meta">
                <?php if ( $cat_name ) : ?>
                    <a href="<?php echo esc_url( $cat_url ); ?>" class="vhh-post-cat"><?php echo esc_html( $cat_name ); ?></a>
                <?php endif; ?>
                <time class="vhh-post-date" datetime="<?php echo esc_attr( get_the_date( 'c', $post->ID ) ); ?>">
                    <?php echo esc_html( get_the_date( '', $post->ID ) ); ?>
                </time>
            </div>
            <h3><a href="<?php echo esc_url( get_permalink( $post->ID ) ); ?>"><?php echo esc_html( get_the_title( $post->ID ) ); ?></a></h3>
            <p><?php echo esc_html( wp_trim_words( get_the_excerpt( $post->ID ), 18, '&hellip;' ) ); ?></p>
            <a href="<?php echo esc_url( get_permalink( $post->ID ) ); ?>" class="vhh-read-more">
                <?php esc_html_e( 'Read article', 'vitalhealth-hub' ); ?> &#8594;
            </a>
        </div>
    </article>
    <?php
}
