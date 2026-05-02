<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<a class="screen-reader-text" href="#vhh-main"><?php esc_html_e( 'Skip to content', 'vitalhealth-hub' ); ?></a>

<!-- ── Site Header ─────────────────────────────────────────────── -->
<header class="vhh-site-header" role="banner">
    <div class="vhh-container">
        <div class="vhh-header-inner">

            <!-- Logo -->
            <div class="vhh-logo-wrap">
                <?php echo vhh_logo_html(); ?>
            </div>

            <!-- Primary Navigation (desktop) -->
            <nav class="vhh-primary-nav" role="navigation" aria-label="<?php esc_attr_e( 'Primary menu', 'vitalhealth-hub' ); ?>">
                <?php
                wp_nav_menu( [
                    'theme_location' => 'primary',
                    'menu_class'     => '',
                    'container'      => false,
                    'fallback_cb'    => 'vhh_fallback_nav',
                ] );
                ?>
            </nav>

            <!-- Header CTA (desktop) -->
            <div class="vhh-header-cta">
                <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn vhh-btn-green" style="font-size:.88rem;padding:.5em 1.1em;">
                    🧮 <?php esc_html_e( 'All Calculators', 'vitalhealth-hub' ); ?>
                </a>
            </div>

            <!-- Hamburger (mobile) -->
            <button class="vhh-menu-toggle" aria-label="<?php esc_attr_e( 'Toggle mobile menu', 'vitalhealth-hub' ); ?>" aria-expanded="false" aria-controls="vhh-mobile-nav">
                <span></span><span></span><span></span>
            </button>

        </div>
    </div>
</header>

<!-- ── Mobile Navigation Overlay ───────────────────────────────── -->
<nav id="vhh-mobile-nav" class="vhh-mobile-nav" aria-label="<?php esc_attr_e( 'Mobile menu', 'vitalhealth-hub' ); ?>" role="navigation">
    <?php
    wp_nav_menu( [
        'theme_location' => 'primary',
        'menu_class'     => '',
        'container'      => false,
        'fallback_cb'    => 'vhh_fallback_nav',
    ] );
    ?>
    <div class="vhh-mobile-cta">
        <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn vhh-btn-green" style="text-align:center;">
            🧮 <?php esc_html_e( 'All Calculators', 'vitalhealth-hub' ); ?>
        </a>
    </div>
</nav>

<!-- ── Main Content ─────────────────────────────────────────────── -->
<main id="vhh-main" class="vhh-main" role="main">
<?php

/**
 * Fallback nav — shown before a menu is assigned in Customizer.
 */
function vhh_fallback_nav() {
    echo '<ul>';
    echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">' . esc_html__( 'Home', 'vitalhealth-hub' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/calculators/' ) ) . '">' . esc_html__( 'Calculators', 'vitalhealth-hub' ) . '</a></li>';
    echo '<li><a href="' . esc_url( home_url( '/blog/' ) ) . '">' . esc_html__( 'Blog', 'vitalhealth-hub' ) . '</a></li>';
    echo '</ul>';
}
