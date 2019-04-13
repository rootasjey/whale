const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    "Search tweets by topic"
    tweets(word: String, count: Int = 10): SearchResult,

    "API version"
    version: String,
  }

  type Subscription {
    tweetAdded(word: String!): Tweet,
  }

  type SearchResult {
    statuses: [Tweet],
    search_metadata: SearchMetada,
  }

  type SearchMetada {
    completed_in: Float,
    max_id: ID,
    max_id_str: String,
    next_results: String,
    query: String,
    refresh_url: String,
    count: Int,
    since_id: Int,
    since_id_str: String,
  }

  "A tweet"
  type Tweet {
    created_at: String,
    id: ID,
    id_str: String,
    text: String,
    truncated: Boolean,
    entities: Entities,
    metadata: Metadata,
    source: String,
    in_reply_to_status_id: ID,
    in_reply_to_status_id_str: String,
    in_reply_to_user_id: ID,
    in_reply_to_user_id_str: String,
    in_reply_to_screen_name: String,
    user: User,
    geo: String,
    coordinates: String,
    place: String,
    contributors: String, # TODO: not sure
    retweeted_status: Tweet, # TODO: check
    is_quote_status: Boolean,
    retween_count: Int,
    favorite_count: Int,
    favorited: Boolean,
    retweeted: Boolean,
    lang: String,
  }

  type Entities {
    hashtags: [String]!,
    symbols: [String]!,
    user_mentions: [Mention],
    urls: [String],
    media: [TweetMedia]
  }

  type Mention {
    screen_name: String,
    name: String,
    id: ID,
    id_str: String,
    indices: [Int]
  }

  type Metadata {
    iso_language_code: String,
    result_type: String,
  }

  type User {
    id: ID,
    id_str: String,
    name: String,
    screen_name: String,
    location: String!,
    description: String,
    url: String,
    entities: UserEntities,
    protected: Boolean,
    followers_count: Int,
    friends_count: Int,
    listed_count: Int,
    created_at: String,
    favourites_count: Int,
    utc_offset: String,
    time_zone: String,
    geo_enabled: Boolean,
    verified: Boolean,
    statuses_count: Int,
    lang: String,
    contibutors_enabled: Boolean,
    is_translator: Boolean,
    is_translation_enabled: Boolean,
    profile_background_color: String,
    profile_background_image_url: String,
    profile_background_image_url_https: String,
    profile_background_image_title: String,
    profile_image_url: String,
    profile_image_url_https: String,
    profile_banner_url: String,
    profile_link_color: String,
    profile_sidebar_border_color: String,
    profile_sidebar_fill_color: String,
    profile_text_color: String,
    profile_use_background_image: Boolean,
    has_extended_profile: Boolean,
    default_profile: Boolean,
    default_profile_image: Boolean,
    following: Boolean,
    following_request_sent: Boolean,
    notifications: Boolean,
    translator_type: String,
  }

  type UserEntities {
    url: UserEntitiesUrl,
    description: UserEntitiesDescription,
  }

  type UserEntitiesUrl {
    urls: UserEntitiesUrlValues,
  }

  type UserEntitiesUrlValues {
    url: String,
    expanded_url: String,
    display_url: String,
    indices: [Int],
  }

  type UserEntitiesDescription {
    urls: [String],
  }

  type TweetMedia {
    id: ID!,
    id_str: String!,
    indices: [Int],
    media_url: String,
    media_url_https: String,
    url: String,
    display_url: String,
    expanded_url: String,
    type: String,
    size: TweetMediaSizeType,
  }

  type TweetMediaSizeType {
    thumb: TweetMediaSize,
    large: TweetMediaSize,
    medium: TweetMediaSize,
    small: TweetMediaSize,
  }

  type TweetMediaSize {
    w: Int,
    h: Int,
    resize: String,
  }
`;
