import Foundation

// import Domain

// MARK: - ResponseDTO

struct ResponseDTO: Codable {
  let status: String
  let statusMessage: String
  let data: DataDTO

  enum CodingKeys: String, CodingKey {
    case status
    case statusMessage = "status_message"
    case data
  }
}

// MARK: - DataDTO

struct DataDTO: Codable {
  let movieCount: Int
  let limit: Int
  let pageNumber: Int
  let movies: [MovieDTO]

  enum CodingKeys: String, CodingKey {
    case movieCount = "movie_count"
    case limit
    case pageNumber = "page_number"
    case movies
  }
}

// MARK: - MovieDTO

struct MovieDTO: Codable {
  let id: Int
  let url: String
  let imdbCode: String
  let title: String
  let titleEnglish: String
  let titleLong: String
  let slug: String
  let year: Int
  let rating: Double
  let runtime: Int
  let genres: [String]
  let summary: String
  let descriptionFull: String
  let synopsis: String
  let ytTrailerCode: String?
  let language: String
  let mpaRating: String
  let backgroundImage: String
  let backgroundImageOriginal: String
  let smallCoverImage: String
  let mediumCoverImage: String
  let largeCoverImage: String
  let state: String
  let torrents: [TorrentDTO]
  let dateUploaded: String
  let dateUploadedUnix: Int

  enum CodingKeys: String, CodingKey {
    case id
    case url
    case imdbCode = "imdb_code"
    case title
    case titleEnglish = "title_english"
    case titleLong = "title_long"
    case slug
    case year
    case rating
    case runtime
    case genres
    case summary
    case descriptionFull = "description_full"
    case synopsis
    case ytTrailerCode = "yt_trailer_code"
    case language
    case mpaRating = "mpa_rating"
    case backgroundImage = "background_image"
    case backgroundImageOriginal = "background_image_original"
    case smallCoverImage = "small_cover_image"
    case mediumCoverImage = "medium_cover_image"
    case largeCoverImage = "large_cover_image"
    case state
    case torrents
    case dateUploaded = "date_uploaded"
    case dateUploadedUnix = "date_uploaded_unix"
  }

  //  func toEntity() -> Movie {
//    return Movie(title: title, coverImage: largeCoverImage)
  //  }
}

// MARK: - TorrentDTO

struct TorrentDTO: Codable {
  let url: String
  let hash: String
  let quality: String
  let type: String
  let isRepack: String
  let videoCodec: String
  let bitDepth: String
  let audioChannels: String
  let seeds: Int
  let peers: Int
  let size: String
  let sizeBytes: Int
  let dateUploaded: String
  let dateUploadedUnix: Int

  enum CodingKeys: String, CodingKey {
    case url
    case hash
    case quality
    case type
    case isRepack = "is_repack"
    case videoCodec = "video_codec"
    case bitDepth = "bit_depth"
    case audioChannels = "audio_channels"
    case seeds
    case peers
    case size
    case sizeBytes = "size_bytes"
    case dateUploaded = "date_uploaded"
    case dateUploadedUnix = "date_uploaded_unix"
  }
}
