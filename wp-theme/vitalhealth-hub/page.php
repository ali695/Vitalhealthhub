<?php
/**
 * Page Template — used for standard WordPress pages and calculator pages.
 */
get_header();

$calc_id     = get_post_meta( get_the_ID(), '_vht_calculator_id', true );
$is_calc     = ! empty( $calc_id );
$is_fullwidth = $is_calc || is_page_template( 'templates/full-width.php' );
?>

<?php if ( $is_calc ) : ?>
<!-- Calculator Page Header -->
<div class="vhh-calculator-page-header">
    <div class="vhh-container">
        <?php vhh_breadcrumbs(); ?>
        <h1><?php the_title(); ?></h1>
        <?php if ( has_excerpt() ) : ?>
            <p><?php echo wp_kses_post( get_the_excerpt() ); ?></p>
        <?php endif; ?>
    </div>
</div>
<?php else : ?>
<!-- Standard Page Header -->
<div class="vhh-archive-header">
    <div class="vhh-container">
        <?php vhh_breadcrumbs(); ?>
        <h1><?php the_title(); ?></h1>
    </div>
</div>
<?php endif; ?>

<div class="vhh-container">
    <div class="vhh-content-wrap <?php echo $is_fullwidth ? 'full-width' : ''; ?>">

        <div class="vhh-main-content">
            <?php while ( have_posts() ) : the_post(); ?>
                <article id="post-<?php the_ID(); ?>" <?php post_class( 'vhh-entry' ); ?>>
                    <div class="vhh-entry-content">
                        <?php the_content(); ?>
                        <?php
                        wp_link_pages( [
                            'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'vitalhealth-hub' ),
                            'after'  => '</div>',
                        ] );
                        ?>
                    </div>
                </article>
            <?php endwhile; ?>
        </div>

        <?php if ( ! $is_fullwidth ) : ?>
        <aside class="vhh-sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Sidebar', 'vitalhealth-hub' ); ?>">
            <?php
            $sidebar = $is_calc ? 'sidebar-calculator' : 'sidebar-blog';
            if ( is_active_sidebar( $sidebar ) ) {
                dynamic_sidebar( $sidebar );
            } else {
                // Default sidebar content
                ?>
                <div class="vhh-sidebar-widget">
                    <h3><?php esc_html_e( 'Popular Calculators', 'vitalhealth-hub' ); ?></h3>
                    <ul>
                        <?php
                        $pop = [
                            'BMI Calculator'           => '/calculators/bmi-calculator/',
                            'Calorie Calculator'       => '/calculators/calorie-calculator/',
                            'TDEE Calculator'          => '/calculators/tdee-calculator/',
                            'Water Intake Calculator'  => '/calculators/water-intake-calculator/',
                            'Sleep Cycle Calculator'   => '/calculators/sleep-cycle-calculator/',
                        ];
                        foreach ( $pop as $label => $path ) {
                            echo '<li><a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
                        }
                        ?>
                    </ul>
                </div>
                <div class="vhh-sidebar-widget">
                    <h3><?php esc_html_e( 'Medical Disclaimer', 'vitalhealth-hub' ); ?></h3>
                    <p style="font-size:.82rem;color:#555;margin:0;"><?php esc_html_e( 'All calculators and articles are for informational purposes only. Always consult a qualified healthcare professional before making health decisions.', 'vitalhealth-hub' ); ?></p>
                </div>
                <?php
            }
            ?>
        </aside>
        <?php endif; ?>

    </div>
</div>

<?php get_footer();
