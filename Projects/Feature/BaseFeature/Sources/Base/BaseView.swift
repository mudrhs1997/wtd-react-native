import RxSwift
import UIKit

open class BaseView: UIView {
  public var disposeBag = DisposeBag()

  public init() {
    super.init(frame: .zero)
    setupSubViews()
    setupLayout()
  }

  @available(*, unavailable)
  public required init?(coder _: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  open func setupSubViews() {}
  open func setupLayout() {}
  open func configure() {}
}
