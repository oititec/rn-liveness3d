require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))
new_arch_enabled = ENV["RCT_NEW_ARCH_ENABLED"] == "1"

Pod::Spec.new do |s|
  s.name         = "oiti-rn-liveness3d"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "15.1" }
  s.source       = { :git => "https://github.com/oititec/rn-liveness3d.git", :tag => "#{s.version}" }

  s.dependency "React-Core"
  s.ios.dependency "OILiveness3D", "3.16.0"

  s.subspec "Swift" do |ss|
    ss.source_files = "ios/**/*.swift"
  end

  s.subspec "Bridge" do |ss|
    ss.source_files = "ios/**/*.{h,mm}"
    ss.private_header_files = "ios/**/*.h"

    if new_arch_enabled && respond_to?(:install_modules_dependencies, true)
      install_modules_dependencies(ss, new_arch_enabled: true)
    end
  end

  s.default_subspecs = "Swift", "Bridge"
end
