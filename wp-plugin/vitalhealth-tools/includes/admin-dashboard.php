<?php
if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'admin_menu', 'vht_register_admin_menu' );

function vht_register_admin_menu() {
    add_menu_page(
        'VitalHealth Hub',
        'VitalHealth Hub',
        'manage_options',
        'vitalhealth-tools',
        'vht_render_dashboard',
        'dashicons-heart',
        25
    );
}

function vht_render_dashboard() {
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( esc_html__( 'You do not have permission to access this page.', 'vitalhealth-tools' ) );
    }

    $imported = isset( $_GET['imported'] ) ? sanitize_key( $_GET['imported'] ) : '';
    $flushed  = isset( $_GET['flushed'] ) ? (bool) $_GET['flushed'] : false;

    // ── Counts ─────────────────────────────────────────────────────────────
    $calc_pages   = get_pages( [ 'meta_key' => '_vht_calculator_id', 'number' => 200 ] );
    $total_calcs  = count( $calc_pages );
    $blog_posts   = get_posts( [ 'numberposts' => -1, 'post_status' => 'publish', 'category_name' => 'Health Calculators,Nutrition,Fitness,Sleep,Mental Wellness,Lifestyle,Preventive Health,Wellness Guides,Pregnancy & Baby' ] );
    $total_posts  = count( get_posts( [ 'numberposts' => -1, 'post_type' => 'post', 'post_status' => 'publish', 'suppress_filters' => true ] ) );
    $missing_seo  = 0;
    $missing_desc = 0;
    foreach ( $calc_pages as $p ) {
        if ( ! get_post_meta( $p->ID, 'rank_math_title', true ) )       $missing_seo++;
        if ( ! get_post_meta( $p->ID, 'rank_math_description', true ) ) $missing_desc++;
    }
    ?>
    <div class="wrap vht-dashboard">
        <h1>
            <span class="dashicons dashicons-heart" style="color:#2D6A4F;font-size:28px;margin-right:8px;"></span>
            VitalHealth Hub — Tools Dashboard
        </h1>

        <?php if ( $imported === 'calculators' ) : ?>
            <div class="notice notice-success is-dismissible"><p>✅ <strong>50 calculator pages imported/updated successfully.</strong></p></div>
        <?php elseif ( $imported === 'blog' ) : ?>
            <div class="notice notice-success is-dismissible"><p>✅ <strong>100 blog posts imported/updated successfully.</strong></p></div>
        <?php endif; ?>
        <?php if ( $flushed ) : ?>
            <div class="notice notice-success is-dismissible"><p>✅ Permalinks flushed successfully.</p></div>
        <?php endif; ?>

        <!-- NAV TABS -->
        <nav class="nav-tab-wrapper" style="margin-bottom:20px;">
            <a href="#vht-overview"   class="nav-tab nav-tab-active" onclick="vhtTab(event,'vht-overview')">Overview</a>
            <a href="#vht-calcs"      class="nav-tab" onclick="vhtTab(event,'vht-calcs')">Calculator Manager</a>
            <a href="#vht-blog"       class="nav-tab" onclick="vhtTab(event,'vht-blog')">Blog Manager</a>
            <a href="#vht-import"     class="nav-tab" onclick="vhtTab(event,'vht-import')">Import Tools</a>
            <a href="#vht-seo-audit"  class="nav-tab" onclick="vhtTab(event,'vht-seo-audit')">SEO Audit</a>
        </nav>

        <!-- ── OVERVIEW ────────────────────────────────────────────────── -->
        <div id="vht-overview" class="vht-tab-content">
            <h2>📊 Overview</h2>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:24px;">
                <?php
                $stats = [
                    [ 'Calculator Pages', $total_calcs,  '#2D6A4F' ],
                    [ 'Total Blog Posts', $total_posts,  '#F4A261' ],
                    [ 'Missing SEO Title',    $missing_seo,  '#e53e3e' ],
                    [ 'Missing Meta Desc',    $missing_desc, '#e53e3e' ],
                ];
                foreach ( $stats as $s ) {
                    echo '<div style="background:#fff;border-left:5px solid ' . esc_attr( $s[2] ) . ';padding:18px 20px;border-radius:6px;box-shadow:0 1px 4px rgba(0,0,0,.08);">';
                    echo '<p style="margin:0;font-size:13px;color:#666;">' . esc_html( $s[0] ) . '</p>';
                    echo '<p style="margin:4px 0 0;font-size:32px;font-weight:700;color:' . esc_attr( $s[2] ) . ';">' . esc_html( $s[1] ) . '</p>';
                    echo '</div>';
                }
                ?>
            </div>
            <p style="color:#555;">Use the <strong>Import Tools</strong> tab to import or update calculators and blog posts. Run <strong>Flush Permalinks</strong> after each import to ensure all URLs work correctly.</p>
        </div>

        <!-- ── CALCULATOR MANAGER ──────────────────────────────────────── -->
        <div id="vht-calcs" class="vht-tab-content" style="display:none;">
            <h2>🧮 Calculator Manager</h2>
            <?php
            $registry = vht_get_calculator_registry();
            ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Slug</th>
                        <th>Shortcode</th>
                        <th>Category</th>
                        <th>SEO Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ( $registry as $calc ) :
                    $page    = get_page_by_path( $calc['slug'], OBJECT, 'page' );
                    $post_id = $page ? $page->ID : 0;
                    $has_seo = $post_id && get_post_meta( $post_id, 'rank_math_title', true );
                    ?>
                    <tr>
                        <td><strong><?php echo esc_html( $calc['title'] ); ?></strong></td>
                        <td><code>/calculators/<?php echo esc_html( $calc['slug'] ); ?>/</code></td>
                        <td><code>[vh_calculator id="<?php echo esc_attr( $calc['id'] ); ?>"]</code></td>
                        <td><?php echo esc_html( $calc['category'] ); ?></td>
                        <td>
                            <?php if ( ! $post_id ) : ?>
                                <span style="color:#e53e3e;">⚠ Not imported</span>
                            <?php elseif ( $has_seo ) : ?>
                                <span style="color:#2D6A4F;">✅ OK</span>
                            <?php else : ?>
                                <span style="color:#F4A261;">⚠ Missing SEO</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if ( $post_id ) : ?>
                                <a href="<?php echo esc_url( get_edit_post_link( $post_id ) ); ?>">Edit</a> |
                                <a href="<?php echo esc_url( get_permalink( $post_id ) ); ?>" target="_blank">View</a>
                            <?php else : ?>
                                <em style="color:#999;">Run import first</em>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>

        <!-- ── BLOG MANAGER ────────────────────────────────────────────── -->
        <div id="vht-blog" class="vht-tab-content" style="display:none;">
            <h2>📝 Blog Manager</h2>
            <?php
            $posts = get_posts( [
                'numberposts'   => 200,
                'post_type'     => 'post',
                'post_status'   => 'publish',
                'meta_key'      => '_vht_imported',
                'meta_value'    => '1',
                'suppress_filters' => true,
            ] );
            if ( empty( $posts ) ) {
                echo '<p style="color:#999;">No VitalHealth blog posts found. Run the blog importer first.</p>';
            } else {
            ?>
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>SEO Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ( $posts as $p ) :
                    $has_seo  = get_post_meta( $p->ID, 'rank_math_title', true );
                    $cats     = wp_get_post_categories( $p->ID, [ 'fields' => 'names' ] );
                    ?>
                    <tr>
                        <td><strong><?php echo esc_html( get_the_title( $p->ID ) ); ?></strong></td>
                        <td><?php echo esc_html( implode( ', ', $cats ) ); ?></td>
                        <td>
                            <?php if ( $has_seo ) : ?>
                                <span style="color:#2D6A4F;">✅ OK</span>
                            <?php else : ?>
                                <span style="color:#e53e3e;">⚠ Missing</span>
                            <?php endif; ?>
                        </td>
                        <td>
                            <a href="<?php echo esc_url( get_edit_post_link( $p->ID ) ); ?>">Edit</a> |
                            <a href="<?php echo esc_url( get_permalink( $p->ID ) ); ?>" target="_blank">View</a>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <?php } ?>
        </div>

        <!-- ── IMPORT TOOLS ────────────────────────────────────────────── -->
        <div id="vht-import" class="vht-tab-content" style="display:none;">
            <h2>🚀 Import Tools</h2>
            <p style="color:#555;max-width:620px;">All importers are idempotent — safe to run multiple times. Existing pages/posts are updated, not duplicated. Run <strong>Flush Permalinks</strong> after any import.</p>
            <div style="display:flex;flex-wrap:wrap;gap:20px;margin-top:20px;">

                <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="background:#fff;padding:24px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.1);flex:1;min-width:220px;text-align:center;">
                    <?php wp_nonce_field( 'vht_import_calculators' ); ?>
                    <input type="hidden" name="action" value="vht_import_calculators">
                    <span class="dashicons dashicons-calculator" style="font-size:40px;color:#2D6A4F;display:block;margin-bottom:10px;"></span>
                    <h3 style="margin:0 0 8px;">Import 50 Calculators</h3>
                    <p style="color:#777;font-size:13px;margin-bottom:16px;">Creates or updates all 50 calculator pages with shortcodes, SEO meta, and schema.</p>
                    <button type="submit" class="button button-primary" style="background:#2D6A4F;border-color:#2D6A4F;">Run Calculator Import</button>
                </form>

                <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="background:#fff;padding:24px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.1);flex:1;min-width:220px;text-align:center;">
                    <?php wp_nonce_field( 'vht_import_blog' ); ?>
                    <input type="hidden" name="action" value="vht_import_blog">
                    <span class="dashicons dashicons-edit" style="font-size:40px;color:#F4A261;display:block;margin-bottom:10px;"></span>
                    <h3 style="margin:0 0 8px;">Import 100 Blog Posts</h3>
                    <p style="color:#777;font-size:13px;margin-bottom:16px;">Creates or updates all 100 SEO-optimised blog posts with categories, meta, and schema.</p>
                    <button type="submit" class="button button-primary" style="background:#F4A261;border-color:#F4A261;color:#fff;">Run Blog Import</button>
                </form>

                <form method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" style="background:#fff;padding:24px;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.1);flex:1;min-width:220px;text-align:center;">
                    <?php wp_nonce_field( 'vht_flush_permalinks' ); ?>
                    <input type="hidden" name="action" value="vht_flush_permalinks">
                    <span class="dashicons dashicons-update" style="font-size:40px;color:#555;display:block;margin-bottom:10px;"></span>
                    <h3 style="margin:0 0 8px;">Flush Permalinks</h3>
                    <p style="color:#777;font-size:13px;margin-bottom:16px;">Run this after any import to ensure all new URLs work correctly. Safe to run anytime.</p>
                    <button type="submit" class="button">Flush Permalinks Now</button>
                </form>

            </div>
        </div>

        <!-- ── SEO AUDIT ───────────────────────────────────────────────── -->
        <div id="vht-seo-audit" class="vht-tab-content" style="display:none;">
            <h2>🔍 SEO Audit</h2>
            <?php
            $issues = [];
            $all_pages = get_pages( [ 'number' => 500 ] );
            foreach ( $all_pages as $p ) {
                if ( ! get_post_meta( $p->ID, 'rank_math_description', true ) ) {
                    $issues[] = [ 'type' => 'Missing Meta Description', 'title' => get_the_title( $p->ID ), 'id' => $p->ID, 'link' => get_edit_post_link( $p->ID ) ];
                }
                if ( ! get_post_meta( $p->ID, 'rank_math_title', true ) ) {
                    $issues[] = [ 'type' => 'Missing SEO Title', 'title' => get_the_title( $p->ID ), 'id' => $p->ID, 'link' => get_edit_post_link( $p->ID ) ];
                }
            }
            $all_posts = get_posts( [ 'numberposts' => 500, 'post_type' => 'post', 'post_status' => 'publish', 'suppress_filters' => true ] );
            foreach ( $all_posts as $p ) {
                if ( ! get_post_meta( $p->ID, 'rank_math_description', true ) ) {
                    $issues[] = [ 'type' => 'Missing Meta Description', 'title' => get_the_title( $p->ID ), 'id' => $p->ID, 'link' => get_edit_post_link( $p->ID ) ];
                }
                if ( ! get_post_meta( $p->ID, 'rank_math_focus_keyword', true ) ) {
                    $issues[] = [ 'type' => 'Missing Focus Keyword', 'title' => get_the_title( $p->ID ), 'id' => $p->ID, 'link' => get_edit_post_link( $p->ID ) ];
                }
            }
            if ( empty( $issues ) ) {
                echo '<div class="notice notice-success inline"><p>✅ <strong>No SEO issues found!</strong> All pages and posts have meta titles, descriptions, and focus keywords.</p></div>';
            } else {
                echo '<p style="color:#e53e3e;"><strong>' . count( $issues ) . ' issue(s) found:</strong></p>';
                echo '<table class="wp-list-table widefat fixed striped"><thead><tr><th>Issue Type</th><th>Page/Post</th><th>Fix</th></tr></thead><tbody>';
                foreach ( $issues as $issue ) {
                    echo '<tr>';
                    echo '<td><span style="color:#e53e3e;">⚠</span> ' . esc_html( $issue['type'] ) . '</td>';
                    echo '<td>' . esc_html( $issue['title'] ) . '</td>';
                    echo '<td><a href="' . esc_url( $issue['link'] ) . '">Edit Post →</a></td>';
                    echo '</tr>';
                }
                echo '</tbody></table>';
            }
            ?>
        </div>
    </div>

    <style>
        .vht-dashboard { max-width: 1200px; }
        .vht-tab-content { background: #f9f9f9; padding: 24px; border-radius: 8px; border: 1px solid #e0e0e0; }
        .vht-dashboard .nav-tab { font-size: 14px; }
    </style>
    <script>
    function vhtTab(e, id) {
        e.preventDefault();
        document.querySelectorAll('.vht-tab-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.nav-tab').forEach(el => el.classList.remove('nav-tab-active'));
        document.getElementById(id).style.display = 'block';
        e.target.classList.add('nav-tab-active');
    }
    </script>
    <?php
}
