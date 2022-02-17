# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-ascii"
  spec.version       = "0.1.1"
  spec.authors       = ["Antonio Vázquez Blanco"]
  spec.email         = ["antoniovazquezblanco@gmail.com"]

  spec.summary       = "Simple theme that relies mostly on ASCII characters. And maybe emojis :)."
  spec.homepage      = "https://github.com/antoniovazquezblanco/jekyll-theme-ascii"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 3.9.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.15.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.7.1"
  spec.add_runtime_dependency "jemoji", "~> 0.12.0"

  spec.add_development_dependency "bundler"
end
