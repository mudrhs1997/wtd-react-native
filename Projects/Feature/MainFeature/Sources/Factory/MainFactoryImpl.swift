import BaseFeature
import Swinject

public final class MainFactoryImpl: MainFactory {
  public func makeCoordinator() -> Coordinator {
    let router = MainRouter()
  }
}
