<?php

/*
|--------------------------------------------------------------------------
| Register Custom Endpoint
|--------------------------------------------------------------------------
|
| https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/
| https://developer.wordpress.org/reference/functions/register_rest_route/
|
*/
add_action('rest_api_init', function () {
    register_rest_route('n8finch/api', '/howdy/', array(
        'methods' => 'GET',
        'callback' =>  'say_hello_from_rest',
        'permission_callback' => function () {
            // return false;
            return current_user_can( 'administrator' );
            return current_user_can( 'api-user' );
        }
    ));
});

function say_hello_from_rest($req) {
    return array(
        "message" => 'Hello ' . $req['name'],
        "headers" => $req->get_headers(),
        "method"  => $req->get_method(),
        "req"     => $req->get_url_params(),
        // see more methods: https://developer.wordpress.org/reference/classes/wp_rest_request/
    );
}

add_action('rest_api_init', function () {
    register_rest_route('myplugin/v1', '/author/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'my_awesome_func',
        'args' => array(
            'id' => array(
                'validate_callback' => function ($param, $request, $key) {
                    return is_numeric($param);
                }
            ),
        ),
    ));
});

function my_awesome_func($data) {
    $posts = get_posts(array(
        'author' => $data['id'],
    ));

    if (empty($posts)) {
        return new WP_Error('no_author', 'Invalid author', array('status' => 404));
    }

    return $posts[0]->post_title;
}