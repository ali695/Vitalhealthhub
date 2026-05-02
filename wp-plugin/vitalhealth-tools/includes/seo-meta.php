<?php
if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Outputs JSON-LD Article schema for blog posts and
 * FAQ schema for calculator pages — hooked into wp_head.
 */
function vht_output_schema() {
    if ( ! is_singular() ) return;

    global $post;
    $post_id = get_the_ID();
    $schema  = [];

    if ( is_singular( 'post' ) ) {
        $schema = [
            '@context'        => 'https://schema.org',
            '@type'           => 'Article',
            'headline'        => get_the_title(),
            'description'     => wp_strip_all_tags( get_the_excerpt() ),
            'datePublished'   => get_the_date( 'c' ),
            'dateModified'    => get_the_modified_date( 'c' ),
            'author'          => [
                '@type' => 'Person',
                'name'  => 'Ali Haider',
                'url'   => 'https://www.linkedin.com/in/ali-haider-seo-consultant/',
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name'  => get_bloginfo( 'name' ),
                'logo'  => [
                    '@type' => 'ImageObject',
                    'url'   => get_site_icon_url(),
                ],
            ],
            'url'             => get_permalink(),
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id'   => get_permalink(),
            ],
        ];

        $thumb = get_the_post_thumbnail_url( $post_id, 'large' );
        if ( $thumb ) $schema['image'] = $thumb;
    }

    if ( is_singular( 'page' ) ) {
        $schema = [
            '@context' => 'https://schema.org',
            '@type'    => 'WebPage',
            'name'     => get_the_title(),
            'url'      => get_permalink(),
        ];
    }

    if ( ! empty( $schema ) ) {
        echo '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) . '</script>' . "\n";
    }
}

/**
 * Output FAQ schema for a given array of Q&A pairs.
 */
function vht_faq_schema_html( $faqs ) {
    if ( empty( $faqs ) ) return '';
    $items = [];
    foreach ( $faqs as $faq ) {
        $items[] = [
            '@type'          => 'Question',
            'name'           => esc_html( $faq['q'] ),
            'acceptedAnswer' => [
                '@type' => 'Answer',
                'text'  => wp_strip_all_tags( $faq['a'] ),
            ],
        ];
    }
    $schema = [
        '@context'   => 'https://schema.org',
        '@type'      => 'FAQPage',
        'mainEntity' => $items,
    ];
    return '<script type="application/ld+json">' . wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>';
}
