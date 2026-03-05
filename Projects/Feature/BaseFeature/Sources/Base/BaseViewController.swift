import DesignSystem
import RxSwift
import UIKit

open class BaseViewController: UIViewController {
  // MARK: - Properties

  public var disposeBag = DisposeBag()
  private let viewDidLoadSubject = PublishSubject<Void>()
  private let viewWillAppearSubject = PublishSubject<Void>()
  private let viewDidAppearSubject = PublishSubject<Void>()
  private let viewWillDisappearSubject = PublishSubject<Void>()
  private let viewDidDisappearSubject = PublishSubject<Void>()

  override open func viewDidLoad() {
    super.viewDidLoad()
    view.backgroundColor = DesignSystemAsset.background.color
    setupSubviews()
    setupLayout()
    bindState()
    bindAction()
    viewDidLoadSubject.onNext(())
  }

  override open func viewWillAppear(_ animated: Bool) {
    super.viewWillAppear(animated)
    viewWillAppearSubject.onNext(())
  }

  override open func viewDidAppear(_ animated: Bool) {
    super.viewDidAppear(animated)
    viewDidAppearSubject.onNext(())
  }

  override open func viewWillDisappear(_ animated: Bool) {
    super.viewWillDisappear(animated)
    viewWillDisappearSubject.onNext(())
  }

  override open func viewDidDisappear(_ animated: Bool) {
    super.viewDidDisappear(animated)
    viewDidDisappearSubject.onNext(())
  }

  open func setupSubviews() {}
  open func setupLayout() {}
  open func bindState() {}
  open func bindAction() {}
}

public extension BaseViewController {
  var viewDidLoadPublisher: Observable<Void> {
    viewDidLoadSubject
  }

  var viewWillAppearPublisher: Observable<Void> {
    viewWillAppearSubject
  }

  var viewDidAppearPublisher: Observable<Void> {
    viewDidAppearSubject
  }

  var viewWillDisppearPublisher: Observable<Void> {
    viewWillDisappearSubject
  }

  var viewDidDisappearPublisher: Observable<Void> {
    viewDidDisappearSubject
  }
}
