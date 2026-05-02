</main><!-- #vhh-main -->

<!-- ── Site Footer ──────────────────────────────────────────────── -->
<footer class="vhh-site-footer" role="contentinfo">
    <div class="vhh-container">
        <div class="vhh-footer-main">

            <!-- Brand Column -->
            <div class="vhh-footer-brand">
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="vhh-logo-link" rel="home">
                    <span class="vhh-logo-mark" style="background:rgba(255,255,255,.15);font-size:.95rem;">VH</span>
                    <span class="vhh-logo-text">
                        <strong><?php bloginfo( 'name' ); ?></strong>
                        <span><?php bloginfo( 'description' ); ?></span>
                    </span>
                </a>
                <p><?php esc_html_e( 'Free, evidence-based health calculators and wellness guides — trusted by readers worldwide. No sign-up required.', 'vitalhealth-hub' ); ?></p>
                <div class="vhh-social-links" style="margin-top:1rem;">
                    <a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
                    <a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer" aria-label="Facebook">f</a>
                    <a href="https://www.instagram.com/ali_haiderseo" target="_blank" rel="noopener noreferrer" aria-label="Instagram">ig</a>
                </div>
            </div>

            <!-- Calculators -->
            <div class="vhh-footer-col">
                <h4><?php esc_html_e( 'Calculators', 'vitalhealth-hub' ); ?></h4>
                <?php
                wp_nav_menu( [
                    'theme_location' => 'footer-left',
                    'container'      => false,
                    'fallback_cb'    => 'vhh_footer_calc_links',
                ] );
                ?>
            </div>

            <!-- Guides -->
            <div class="vhh-footer-col">
                <h4><?php esc_html_e( 'Wellness Guides', 'vitalhealth-hub' ); ?></h4>
                <?php
                wp_nav_menu( [
                    'theme_location' => 'footer-mid',
                    'container'      => false,
                    'fallback_cb'    => 'vhh_footer_guide_links',
                ] );
                ?>
            </div>

            <!-- Company -->
            <div class="vhh-footer-col">
                <h4><?php esc_html_e( 'About', 'vitalhealth-hub' ); ?></h4>
                <?php
                wp_nav_menu( [
                    'theme_location' => 'footer-right',
                    'container'      => false,
                    'fallback_cb'    => 'vhh_footer_about_links',
                ] );
                ?>
            </div>

        </div><!-- .vhh-footer-main -->

        <div class="vhh-footer-bottom">
            <p>
                &copy; <?php echo esc_html( gmdate( 'Y' ) ); ?>
                <a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php bloginfo( 'name' ); ?></a>.
                <?php esc_html_e( 'Created by', 'vitalhealth-hub' ); ?>
                <a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer">Ali Haider</a>.
                <?php esc_html_e( 'For informational purposes only — not medical advice.', 'vitalhealth-hub' ); ?>
            </p>
            <nav aria-label="<?php esc_attr_e( 'Footer legal links', 'vitalhealth-hub' ); ?>">
                <p>
                    <a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'vitalhealth-hub' ); ?></a>
                    &nbsp;·&nbsp;
                    <a href="<?php echo esc_url( home_url( '/disclaimer/' ) ); ?>"><?php esc_html_e( 'Disclaimer', 'vitalhealth-hub' ); ?></a>
                </p>
            </nav>
        </div>

    </div>
</footer>

<?php wp_footer(); ?>
</body>
</html>

<?php
function vhh_footer_calc_links() {
    echo '<ul>';
    $links = [
        '/calculators/bmi-calculator/'         => 'BMI Calculator',
        '/calculators/tdee-calculator/'         => 'TDEE Calculator',
        '/calculators/calorie-calculator/'      => 'Calorie Calculator',
        '/calculators/water-intake-calculator/' => 'Water Intake Calculator',
        '/calculators/sleep-cycle-calculator/'  => 'Sleep Cycle Calculator',
    ];
    foreach ( $links as $path => $label ) {
        echo '<li><a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
    }
    echo '</ul>';
}

function vhh_footer_guide_links() {
    echo '<ul>';
    $links = [
        '/blog/'                     => 'All Articles',
        '/category/nutrition/'       => 'Nutrition',
        '/category/fitness/'         => 'Fitness',
        '/category/sleep/'           => 'Sleep',
        '/category/mental-wellness/' => 'Mental Wellness',
    ];
    foreach ( $links as $path => $label ) {
        echo '<li><a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
    }
    echo '</ul>';
}

function vhh_footer_about_links() {
    echo '<ul>';
    $links = [
        '/about/'          => 'About Ali Haider',
        '/contact/'        => 'Contact',
        '/privacy-policy/' => 'Privacy Policy',
        '/disclaimer/'     => 'Disclaimer',
    ];
    foreach ( $links as $path => $label ) {
        echo '<li><a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
    }
    echo '</ul>';
}
