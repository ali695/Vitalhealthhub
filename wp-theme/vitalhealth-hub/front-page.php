<?php
/**
 * Front Page Template — VitalHealth Hub Homepage
 */
get_header();
?>

<!-- ── Hero ─────────────────────────────────────────────────────── -->
<section class="vhh-hero">
    <div class="vhh-container">
        <div class="vhh-hero-inner">
            <div class="vhh-hero-content">
                <div class="vhh-badge">✅ Free · Evidence-Based · No Sign-Up</div>
                <h1>Your Personal<br><span>Health Calculator</span><br>Hub</h1>
                <p><?php esc_html_e( '50+ free health calculators covering BMI, calories, sleep, hydration, heart rate, and more — all in one trusted place.', 'vitalhealth-hub' ); ?></p>
                <div class="vhh-hero-actions">
                    <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn">
                        🧮 <?php esc_html_e( 'Explore All Calculators', 'vitalhealth-hub' ); ?>
                    </a>
                    <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="vhh-btn-outline" style="color:#fff;border-color:rgba(255,255,255,.5);">
                        📖 <?php esc_html_e( 'Read Wellness Guides', 'vitalhealth-hub' ); ?>
                    </a>
                </div>
                <div class="vhh-hero-stats">
                    <div class="vhh-hero-stat"><strong>50+</strong><span><?php esc_html_e( 'Calculators', 'vitalhealth-hub' ); ?></span></div>
                    <div class="vhh-hero-stat"><strong>100+</strong><span><?php esc_html_e( 'Articles', 'vitalhealth-hub' ); ?></span></div>
                    <div class="vhh-hero-stat"><strong>100%</strong><span><?php esc_html_e( 'Free', 'vitalhealth-hub' ); ?></span></div>
                </div>
            </div>
            <div class="vhh-hero-visual" aria-hidden="true">
                <div class="vhh-hero-card-stack">
                    <div class="vhh-mock-card">
                        <div class="vhh-mock-card-label">BMI Calculator</div>
                        <div class="vhh-mock-card-value">22.4</div>
                        <div class="vhh-mock-card-sub">✅ Normal Weight</div>
                        <div class="vhh-mock-bar"><div class="vhh-mock-bar-fill" style="width:58%;"></div></div>
                    </div>
                    <div class="vhh-mock-card">
                        <div class="vhh-mock-card-label">Daily Water Target</div>
                        <div class="vhh-mock-card-value">2.6 L</div>
                        <div class="vhh-mock-card-sub">💧 Based on your weight</div>
                    </div>
                    <div class="vhh-mock-card">
                        <div class="vhh-mock-card-label">Calories to Maintain</div>
                        <div class="vhh-mock-card-value">2,180</div>
                        <div class="vhh-mock-card-sub">🔥 kcal / day</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- ── Trust Strip ───────────────────────────────────────────────── -->
<div class="vhh-features-strip">
    <div class="vhh-container">
        <div class="vhh-features-grid">
            <div class="vhh-feature-item"><span class="vhh-feature-icon">🔬</span><?php esc_html_e( 'Evidence-Based Formulas', 'vitalhealth-hub' ); ?></div>
            <div class="vhh-feature-item"><span class="vhh-feature-icon">🔒</span><?php esc_html_e( 'No Data Stored', 'vitalhealth-hub' ); ?></div>
            <div class="vhh-feature-item"><span class="vhh-feature-icon">📱</span><?php esc_html_e( 'Mobile Friendly', 'vitalhealth-hub' ); ?></div>
            <div class="vhh-feature-item"><span class="vhh-feature-icon">⚡</span><?php esc_html_e( 'Instant Results', 'vitalhealth-hub' ); ?></div>
            <div class="vhh-feature-item"><span class="vhh-feature-icon">✅</span><?php esc_html_e( '100% Free — Always', 'vitalhealth-hub' ); ?></div>
        </div>
    </div>
</div>

<!-- ── Calculator Categories Grid ────────────────────────────────── -->
<section class="vhh-section vhh-section-alt">
    <div class="vhh-container">
        <div class="vhh-section-header">
            <div class="vhh-badge"><?php esc_html_e( '50+ Tools', 'vitalhealth-hub' ); ?></div>
            <h2><?php esc_html_e( 'Browse by Health Category', 'vitalhealth-hub' ); ?></h2>
            <p><?php esc_html_e( 'Every calculator uses validated, evidence-based formulas referenced by the WHO, NIH, and NHS.', 'vitalhealth-hub' ); ?></p>
        </div>
        <div class="vhh-calc-grid">
            <?php
            $categories = [
                [ 'icon' => '⚖️', 'title' => 'Weight & Body',     'desc' => 'BMI, healthy weight range, body fat, weight loss goal.',   'slug' => 'bmi-calculator',           'tag' => 'Health Calculators' ],
                [ 'icon' => '🥗', 'title' => 'Nutrition',          'desc' => 'Calories, macros, protein, sugar, sodium, and vitamins.',  'slug' => 'calorie-calculator',        'tag' => 'Nutrition' ],
                [ 'icon' => '💧', 'title' => 'Hydration',          'desc' => 'Water intake, electrolytes, and activity-based hydration.','slug' => 'water-intake-calculator',   'tag' => 'Hydration' ],
                [ 'icon' => '🏃', 'title' => 'Fitness & Calories', 'desc' => 'Calories burned walking, HIIT, strength training & more.', 'slug' => 'walking-calories-calculator','tag' => 'Fitness' ],
                [ 'icon' => '❤️', 'title' => 'Heart Rate',         'desc' => 'Target zones, resting rate, VO₂ max, and recovery.',      'slug' => 'heart-rate-calculator',     'tag' => 'Fitness' ],
                [ 'icon' => '😴', 'title' => 'Sleep',              'desc' => 'Sleep cycles, optimal bedtime, nap duration.',            'slug' => 'sleep-cycle-calculator',    'tag' => 'Sleep' ],
                [ 'icon' => '🧠', 'title' => 'Mental Wellness',    'desc' => 'Stress recovery, mindfulness, work-life balance.',        'slug' => 'stress-level-calculator',   'tag' => 'Mental Wellness' ],
                [ 'icon' => '🛡️', 'title' => 'Preventive Health', 'desc' => 'Metabolic age, waist risk, family health risk score.',    'slug' => 'metabolic-age-calculator',  'tag' => 'Preventive Health' ],
            ];
            foreach ( $categories as $cat ) :
                $page = get_page_by_path( $cat['slug'], OBJECT, 'page' );
                $url  = $page ? get_permalink( $page->ID ) : home_url( '/calculators/' );
            ?>
            <a href="<?php echo esc_url( $url ); ?>" class="vhh-calc-card">
                <span class="vhh-calc-card-icon" aria-hidden="true"><?php echo $cat['icon']; ?></span>
                <h3><?php echo esc_html( $cat['title'] ); ?></h3>
                <p><?php echo esc_html( $cat['desc'] ); ?></p>
                <span class="vhh-calc-card-tag"><?php echo esc_html( $cat['tag'] ); ?></span>
            </a>
            <?php endforeach; ?>
        </div>
        <div style="text-align:center;margin-top:2rem;">
            <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn-green vhh-btn">
                <?php esc_html_e( 'View All 50+ Calculators', 'vitalhealth-hub' ); ?> →
            </a>
        </div>
    </div>
</section>

<!-- ── Latest Blog Posts ─────────────────────────────────────────── -->
<?php
$latest_posts = get_posts( [
    'posts_per_page' => 6,
    'post_status'    => 'publish',
    'orderby'        => 'date',
    'order'          => 'DESC',
] );
if ( $latest_posts ) :
?>
<section class="vhh-section">
    <div class="vhh-container">
        <div class="vhh-section-header">
            <div class="vhh-badge"><?php esc_html_e( '100+ Articles', 'vitalhealth-hub' ); ?></div>
            <h2><?php esc_html_e( 'Latest Wellness Guides', 'vitalhealth-hub' ); ?></h2>
            <p><?php esc_html_e( 'Expert-written guides by Ali Haider covering nutrition, fitness, sleep, mental wellness, and more.', 'vitalhealth-hub' ); ?></p>
        </div>
        <div class="vhh-blog-grid">
            <?php foreach ( $latest_posts as $post ) : setup_postdata( $post ); ?>
                <?php vhh_post_card( $post ); ?>
            <?php endforeach; wp_reset_postdata(); ?>
        </div>
        <div style="text-align:center;margin-top:2rem;">
            <a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>" class="vhh-btn-outline vhh-btn">
                <?php esc_html_e( 'Read All Articles', 'vitalhealth-hub' ); ?> →
            </a>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- ── CTA Banner ────────────────────────────────────────────────── -->
<section class="vhh-section-alt">
    <div class="vhh-container">
        <div class="vhh-cta-banner">
            <h2><?php esc_html_e( 'Start Tracking Your Health Today', 'vitalhealth-hub' ); ?></h2>
            <p><?php esc_html_e( 'Free health calculators — no sign-up, no cost, no data stored. Just instant, personalised results.', 'vitalhealth-hub' ); ?></p>
            <a href="<?php echo esc_url( home_url( '/calculators/' ) ); ?>" class="vhh-btn-green vhh-btn" style="background:#fff;color:#E76F51;border-color:#fff;">
                🧮 <?php esc_html_e( 'Try a Calculator Now', 'vitalhealth-hub' ); ?>
            </a>
        </div>
    </div>
</section>

<?php get_footer();
