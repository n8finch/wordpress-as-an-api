<?php

/*
|--------------------------------------------------------------------------
| Modify existing endpoints: https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/
|--------------------------------------------------------------------------
|
| Register Rest Field: https://developer.wordpress.org/reference/functions/register_rest_field/
| Register Meta: https://developer.wordpress.org/reference/functions/register_meta/
*/

add_action('rest_api_init', function () {
    register_rest_field('post', 'featured_image_src', array(
        'get_callback' => function ($post_arr) {
            $image_src_arr = wp_get_attachment_image_src($post_arr['featured_media'], 'large');

            return $image_src_arr[0];
        },
        'update_callback' => null,
        'schema' => null
    ));
});


register_meta('post', '_thumbnail_id', array(
    'type'         => 'string',
    'description'  => 'A meta key associated with a string meta value.',
    'single'       => true,
    'show_in_rest' => true,
));
