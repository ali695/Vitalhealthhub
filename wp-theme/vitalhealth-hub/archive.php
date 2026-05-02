<?php
/**
 * Archive Template — category, tag, date, author archives.
 */
get_header();

$archive_title = get_the_archive_title();
$archive_desc  = get_the_archive_description();
?>

<div class="vhh-archive-header">
    <div class="vhh-container">
        <?php vhh_breadcrumbs(); ?>
        <h1><?php echo wp_kses_post( $archive_title ); ?></h1>
        <?php if ( $archive_desc ) : ?>
            <p><?php echo wp_kses_post( $archive_desc ); ?></p>
        <?php endif; ?>
    </div>
</div>

<div class="vhh-container">
    <div class="vhh-content-wrap">

        <div class="vhh-main-content">
            <?php if ( have_posts() ) : ?>

                <div class="vhh-blog-grid">
                    <?php while ( have_posts() ) : the_post(); ?>
                        <?php vhh_post_card( get_post() ); ?>
                    <?php endwhile; ?>
                </div>

                <!-- Pagination -->
                <div class="vhh-pagination">
                    <?php
                    echo paginate_links( [
                        'prev_text' => '&larr;',
                        'next_text' => '&rarr;',
                        'type'      => 'list',
                    ] );
                    ?>
                </div>

            <?php else : ?>
                <div class="vhh-sidebar-widget">
                    <h2><?php esc_html_e( 'No posts found', 'vitalhealth-hub' ); ?></h2>
                    <p><?php esc_html_e( 'Sorry, no articles were found in this category. Try browsing all articles or using the search.', 'vitalhealth-hub' ); ?></p>
                    <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="vhh-btn-green vhh-btn"><?php esc_html_e( 'All Articles', 'vitalhealth-hub' ); ?></a>
                </div>
            <?php endif; ?>
        </div>

        <aside class="vhh-sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Archive sidebar', 'vitalhealth-hub' ); ?>">
            <?php
            if ( is_active_sidebar( 'sidebar-blog' ) ) {
                dynamic_sidebar( 'sidebar-blog' );
            } else {
            ?>
            <div class="vhh-sidebar-widget">
                <h3><?php esc_html_e( 'All Categories', 'vitalhealth-hub' ); ?></h3>
                <ul>
                    <?php
                    $cats = get_categories( [ 'orderby' => 'count', 'order' => 'DESC' ] );
                    foreach ( $cats as $c ) {
                        echo '<li><a href="' . esc_url( get_category_link( $c->term_id ) ) . '">' . esc_html( $c->name ) . ' (' . esc_html( $c->count ) . ')</a></li>';
                    }
                    ?>
                </ul>
            </div>
            <div class="vhh-sidebar-widget">
                <h3><?php esc_html_e( 'Popular Calculators', 'vitalhealth-hub' ); ?></h3>
                <ul>
                    <?php
                    $pop = [
                        'BMI Calculator'          => '/calculators/bmi-calculator/',
                        'Calorie Calculator'      => '/calculators/calorie-calculator/',
                        'Water Intake Calculator' => '/calculators/water-intake-calculator/',
                        'Sleep Cycle Calculator'  => '/calculators/sleep-cycle-calculator/',
                    ];
                    foreach ( $pop as $l => $p ) {
                        echo '<li><a href="' . esc_url( home_url( $p ) ) . '">' . esc_html( $l ) . '</a></li>';
                    }
                    ?>
                </ul>
            </div>
            <?php } ?>
        </aside>

    </div>
</div>

<?php get_footer();
