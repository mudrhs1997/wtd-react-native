import BaseFeature
import UIKit

final class SplashViewController: BaseViewController {
  // MARK: - Properties
  private let splashViewModel: SplashViewModel

  private let mainLabel: UILabel = {
    let label = UILabel()
    label.translatesAutoresizingMaskIntoConstraints = false
    label.text = "Splash View"
    label.textColor = .white
    return label
  }()

  init(splashViewModel: SplashViewModel) {
    self.splashViewModel = splashViewModel
    super.init(nibName: nil, bundle: nil)
  }

  required init?(coder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  override func viewDidLoad() {
    super.viewDidLoad()
  }

  override func bindState() {
    let input = SplashViewModel.Input(viewDidLoad: viewDidLoadPublisher)
    let output = splashViewModel.transform(input: input)
  }

  override func bindAction() {}

  override func setupSubviews() {
    view.addSubview(mainLabel)
  }

  override func setupLayout() {
    NSLayoutConstraint.activate([
      mainLabel.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 20),
      mainLabel.leadingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.leadingAnchor, constant: 20),
      mainLabel.trailingAnchor.constraint(equalTo: view.safeAreaLayoutGuide.trailingAnchor, constant: -20),
      mainLabel.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -20),
    ])
  }
}
