# Using WordPress as an API

This workshop was given at WordCampEU 2022 in Porto, Portugal.

WordPressTV has the workshop presentation here: [link coming soon...]

## Workshop Prerequisites

- Probably your own laptop to work along.
- Install [LocalWP.com](https://LocalWP.com), cross platform, available for Linux, Windows, and Mac.
- [Postman app](https://www.postman.com/) (preferred, if you want to import the collection) or [Insomnia app](https://insomnia.rest/download) installed, cross platform, available for Linux, Windows, and Mac (or you can use the web version of Postman.
- Knowledge and experience with Git, PHP, and maybe some JS.
- Import the attached Postman collection.
- Install the following plugins (can be found in the WordPress repository or downloaded from Github):
    - [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
    - [Custom Post Types UI](https://wordpress.org/plugins/custom-post-type-ui/)
    - WordPress Importer (for importing content)
    - [WPGraphQL](https://wpgraphql.com)
    - [WPGraphQL Advanced Custom Fields](https://github.com/wp-graphql/wp-graphql-acf)
    - [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)
- [NodeJS](https://nodejs.org) installed to use the WP Reader in the subfolder (the README is available there as well for getting set up and running with that app).

The PDF of the slides is also available in this repository.

## Links and Resources

- [WP REST API Handbook](https://developer.wordpress.org/rest-api/)
    - [Endpoint Reference](https://developer.wordpress.org/rest-api/reference/)
    - [Schema Reference](https://developer.wordpress.org/rest-api/extending-the-rest-api/schema/)
    - [Custom REST Endpoint](https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-custom-endpoints/)
    - [Modifying responses](https://developer.wordpress.org/rest-api/extending-the-rest-api/modifying-responses/)
    - [Register Rest Field](https://developer.wordpress.org/reference/functions/register_rest_field/)
    - [Register Meta](https://developer.wordpress.org/reference/functions/register_meta/)
- [WPGraphQL](https://www.wpgraphql.com/docs)
- [WP-API Team Github](https://github.com/WP-API)

- [API Key/APP Password](https://make.wordpress.org/core/2020/11/05/application-passwords-integration-guide/)
- [Context in the WP REST API](https://make.xwp.co/2017/07/25/defining-context-in-the-wp-rest-api/)
- [JavaScript Web Tokens (JWT)](https://jwt.io/)
- Others to check out:
    - [Kellen Mace's awesome demo using cookies](https://www.youtube.com/watch?v=eeWxvCZHxLs)
    - [https://developer.wordpress.org/reference/functions/register_post_type/](https://developer.wordpress.org/reference/functions/register_post_type/)
    - [https://developer.wordpress.org/resource/dashicons/](https://developer.wordpress.org/resource/dashicons/)
    - [http://www.christinachern.com/hpipsum/](http://www.christinachern.com/hpipsum/)
    - [https://www.advancedcustomfields.com/resources/integrating-custom-field-types/](https://www.advancedcustomfields.com/resources/integrating-custom-field-types/)
    - [https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/](https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/)
    - [https://developer.wordpress.org/reference/functions/register_post_type/](https://developer.wordpress.org/reference/functions/register_post_type/)
    - [https://developer.wordpress.org/resource/dashicons/](https://developer.wordpress.org/resource/dashicons/)
    - [http://www.christinachern.com/hpipsum/](http://www.christinachern.com/hpipsum/)
    - [https://www.advancedcustomfields.com/resources/integrating-custom-field-types/](https://www.advancedcustomfields.com/resources/integrating-custom-field-types/)
    - [https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/](https://developer.wordpress.org/rest-api/using-the-rest-api/global-parameters/)
    - [https://www.wpgraphql.com/docs/authentication-and-authorization/](https://www.wpgraphql.com/docs/authentication-and-authorization/)
    - [https://bestofphp.com/repo/wp-graphql-wp-graphql-jwt-authentication-php-awesome-wordpress](https://bestofphp.com/repo/wp-graphql-wp-graphql-jwt-authentication-php-awesome-wordpress)
    - [https://www.wpgraphql.com/recipes/debugging-jwt-authentication/](https://www.wpgraphql.com/recipes/debugging-jwt-authentication/)
    - [https://dev.to/christopherarter/middleware-for-wordpress-g4k](https://dev.to/christopherarter/middleware-for-wordpress-g4k)
    - [https://github.com/christopherarter/WP-Middleware-Plugin](https://github.com/christopherarter/WP-Middleware-Plugin)
    - [https://axios-http.com/docs/req_config](https://axios-http.com/docs/req_config)
