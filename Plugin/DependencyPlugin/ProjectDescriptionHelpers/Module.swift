import ProjectDescription

public enum Module {
  case feature(Feature)
  case domain(Domain)
  case data(Data)
  case core(Core)
  case shared(Shared)

  public func targetName(type: TargetType) -> String {
    switch self {
    case let .feature(feature):
      feature.targetName(type: type)
    case let .domain(domain):
      domain.targetName(type: type)
    case let .data(data):
      data.targetName(type: type)
    case let .core(core):
      core.targetName(type: type)
    case let .shared(shared):
      shared.targetName(type: type)
    }
  }
}

public extension Module {
  enum Feature: String, TargetPathConvertable, CaseIterable {
    case BaseFeature
    case RootFeature
    case SplashFeature
    case OnboardingFeature
    case SigninFeature
    case SignupFeature
    case MainFeature
    case HomeFeature
    case ActivityFeature
  }
}

public extension Module {
  enum Domain: String, TargetPathConvertable {
    case ScreenTimeDomain
  }
}

public extension Module {
  enum Data: String, TargetPathConvertable {
    case Database
  }
}

public extension Module {
  enum Core: String, TargetPathConvertable {
    case Networking
  }
}

public extension Module {
  enum Shared: String, TargetPathConvertable {
    case DesignSystem
    case ThirdPartyLibrary
  }
}

public enum TargetType: String {
  case interface = "Interface"
  case sources = ""
  case testing = "Testing"
  case tests = "Tests"
  case demo = "Demo"
}

public protocol TargetPathConvertable {
  func targetName(type: TargetType) -> String
}

public extension TargetPathConvertable where Self: RawRepresentable {
  func targetName(type: TargetType) -> String {
    "\(rawValue)\(type.rawValue)"
  }
}
