import BaseFeature

public protocol SplashFactory {
  func makeCoordinator() -> Coordinator
}
