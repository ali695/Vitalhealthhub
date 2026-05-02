<?php
/**
 * Single Post Template — Blog articles.
 */
get_header();
?>

<?php while ( have_posts() ) : the_post(); ?>

<?php
$cats      = get_the_category();
$cat_name  = $cats ? $cats[0]->name : '';
$cat_url   = $cats ? get_category_link( $cats[0]->term_id ) : '#';
$read_time = vhh_reading_time( get_the_ID() );
?>

<!-- Post Header Banner -->
<div class="vhh-archive-header">
    <div class="vhh-container">
        <?php vhh_breadcrumbs(); ?>
        <?php if ( $cat_name ) : ?>
            <a href="<?php echo esc_url( $cat_url ); ?>" class="vhh-post-cat" style="margin-bottom:.65rem;display:inline-block;"><?php echo esc_html( $cat_name ); ?></a>
        <?php endif; ?>
        <h1 class="vhh-entry-title" style="max-width:820px;"><?php the_title(); ?></h1>
        <div class="vhh-entry-meta">
            <span><?php esc_html_e( 'By', 'vitalhealth-hub' ); ?> <a href="<?php echo esc_url( home_url( '/about/' ) ); ?>">Ali Haider</a></span>
            <time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>">
                <?php echo esc_html( get_the_date() ); ?>
            </time>
            <span><?php echo esc_html( $read_time ); ?></span>
        </div>
    </div>
</div>

<div class="vhh-container">
    <div class="vhh-content-wrap">

        <!-- Main Article -->
        <article id="post-<?php the_ID(); ?>" <?php post_class( 'vhh-main-content' ); ?>>

            <?php if ( has_post_thumbnail() ) : ?>
                <img
                    src="<?php the_post_thumbnail_url( 'vhh-hero' ); ?>"
                    alt="<?php echo esc_attr( get_the_title() ); ?>"
                    class="vhh-entry-featured-image"
                    width="1200" height="600"
                    loading="eager"
                >
            <?php endif; ?>

            <div class="vhh-entry-content">
                <?php the_content(); ?>
                <?php
                wp_link_pages( [
                    'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'vitalhealth-hub' ),
                    'after'  => '</div>',
                ] );
                ?>
            </div>

            <!-- Tags -->
            <?php
            $tags = get_the_tags();
            if ( $tags ) :
            ?>
            <div class="vhh-entry-tags" style="margin-top:1.5rem;display:flex;gap:.4rem;flex-wrap:wrap;">
                <?php foreach ( $tags as $tag ) : ?>
                    <a href="<?php echo esc_url( get_tag_link( $tag->term_id ) ); ?>" style="font-size:.8rem;padding:.2em .7em;background:rgba(45,106,79,.08);color:#2D6A4F;border-radius:999px;">
                        #<?php echo esc_html( $tag->name ); ?>
                    </a>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>

            <!-- Author Box -->
            <div class="vhh-author-box">
                <div class="vhh-author-avatar" aria-hidden="true">AH</div>
                <div class="vhh-author-info">
                    <h4>Ali Haider — <?php esc_html_e( 'SEO Consultant &amp; Health Content Creator', 'vitalhealth-hub' ); ?></h4>
                    <p><?php esc_html_e( 'Ali Haider is an SEO consultant and the creator of VitalHealth Hub. He specialises in evidence-based health content and building tools that help people make informed wellness decisions.', 'vitalhealth-hub' ); ?></p>
                    <div class="vhh-author-links">
                        <a href="https://www.linkedin.com/in/ali-haider-seo-consultant/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        <a href="https://www.facebook.com/AliHadi768" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://www.instagram.com/ali_haiderseo" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="mailto:ma7122671@gmail.com">Email</a>
                    </div>
                </div>
            </div>

            <!-- Post Navigation -->
            <?php vhh_post_nav(); ?>

        </article>

        <!-- Sidebar -->
        <aside class="vhh-sidebar" role="complementary" aria-label="<?php esc_attr_e( 'Article sidebar', 'vitalhealth-hub' ); ?>">
            <?php
            if ( is_active_sidebar( 'sidebar-blog' ) ) {
                dynamic_sidebar( 'sidebar-blog' );
            } else {
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
                        'Macro Calculator'         => '/calculators/macro-calculator/',
                    ];
                    foreach ( $pop as $label => $path ) {
                        echo '<li><a href="' . esc_url( home_url( $path ) ) . '">' . esc_html( $label ) . '</a></li>';
                    }
                    ?>
                </ul>
            </div>
            <div class="vhh-sidebar-widget">
                <h3><?php esc_html_e( 'Categories', 'vitalhealth-hub' ); ?></h3>
                <ul>
                    <?php
                    $all_cats = get_categories( [ 'orderby' => 'count', 'order' => 'DESC', 'number' => 8 ] );
                    foreach ( $all_cats as $c ) {
                        echo '<li><a href="' . esc_url( get_category_link( $c->term_id ) ) . '">' . esc_html( $c->name ) . ' <span style="color:#aaa;font-size:.8em;">(' . esc_html( $c->count ) . ')</span></a></li>';
                    }
                    ?>
                </ul>
            </div>
            <div class="vhh-sidebar-widget" style="background:linear-gradient(135deg,#2D6A4F,#52B788);border:none;color:#fff;">
                <h3 style="color:#fff;border-color:rgba(255,255,255,.2);"><?php esc_html_e( 'Try a Free Calculator', 'vitalhealth-hub' ); ?></h3>
                <p style="color:rgba(255,255,255,.82);font-size:.88rem;"><?php esc_html_e( 'Get personalised health insights in seconds — free, instant, no sign-up.', 'vitalhealth-hub' ); ?></p>
                <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn" style="width:100%;text-align:center;margin-top:.5rem;"><?php esc_html_e( '🧮 Explore Calculators', 'vitalhealth-hub' ); ?></a>
            </div>
            <?php } ?>
        </aside>

    </div><!-- .vhh-content-wrap -->
</div><!-- .vhh-container -->

<!-- Related Posts -->
<div class="vhh-container">
    <?php vhh_related_posts( 3 ); ?>
</div>

<?php endwhile; ?>

<?php get_footer();
