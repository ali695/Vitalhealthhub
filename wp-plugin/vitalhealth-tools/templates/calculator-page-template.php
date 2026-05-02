<?php
/**
 * Template: Calculator Page
 * Used by the calculators importer to set a clean full-width page layout.
 * WordPress checks for this template via _wp_page_template post meta.
 *
 * Template Name: VitalHealth Calculator Page
 */
if ( ! defined( 'ABSPATH' ) ) exit;

get_header();
?>
<main id="vht-calculator-page" class="vht-calculator-page">
    <div class="vht-container">
        <?php while ( have_posts() ) : the_post(); ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class( 'vht-calc-article' ); ?>>

                <header class="vht-entry-header">
                    <h1 class="vht-entry-title"><?php the_title(); ?></h1>
                    <?php if ( has_excerpt() ) : ?>
                        <p class="vht-entry-excerpt"><?php the_excerpt(); ?></p>
                    <?php endif; ?>
                </header>

                <div class="vht-entry-content">
                    <?php the_content(); ?>
                </div>

            </article>
        <?php endwhile; ?>
    </div>
</main>
<?php
get_footer();
