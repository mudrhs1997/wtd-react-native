//
//  NumberFormatter.swift
//  Hooligans
//
//  Created by 정명곤 on 11/9/23.
//

import Foundation

func numberFormatter(number: Int) -> String {
  let numberFormatter = NumberFormatter()
  numberFormatter.numberStyle = .decimal

  return numberFormatter.string(from: NSNumber(value: number))!
}
