import UIKit
import RxSwift
import RxCocoa


final class WelcomeView: UIView {
  private let disposeBag = DisposeBag()

  private let welcomeLabel: UILabel = {
    let label = UILabel()
    label.translatesAutoresizingMaskIntoConstraints = false
    label.text = "Welcome to the App"
    label.font = .boldSystemFont(ofSize: 24)
    label.textColor = .white
    label.textAlignment = .center
    return label
  }()


  init() {
    super.init(frame: .zero)
    setSubViews()
    setLayout()
  }

  required init?(coder: NSCoder) {
    fatalError()
  }

}

extension WelcomeView {
  private func setSubViews() {
    addSubview(welcomeLabel)
  }

  private func setLayout() {
    NSLayoutConstraint.activate([
      welcomeLabel.topAnchor.constraint(equalTo: topAnchor, constant: 80),
      welcomeLabel.centerXAnchor.constraint(equalTo: centerXAnchor),
      welcomeLabel.bottomAnchor.constraint(equalTo: bottomAnchor, constant: -100),
    ])
  }
}

extension WelcomeView: OnboardingPage {
  func animateIn() {
    welcomeLabel.transform = CGAffineTransform(translationX: 0, y: -20)
    self.welcomeLabel.alpha = 1
//    UIView.animate(withDuration: 0.75, delay: 0, options: [.curveEaseInOut]) {
//      self.welcomeLabel.alpha = 1
//      self.welcomeLabel.transform = .identity
//    }
  }

  func animateOut() {
    self.welcomeLabel.alpha = 0
    self.welcomeLabel.transform = CGAffineTransform(translationX: 0, y: -40)
//    UIView.animate(withDuration: 0.75, delay: 0, options: [.curveEaseInOut]) {
//      self.welcomeLabel.alpha = 0
//      self.welcomeLabel.transform = CGAffineTransform(translationX: 0, y: -20)
//    }
  }
}
