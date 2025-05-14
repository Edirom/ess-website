# Produces a path relative to the current page. For example, if the path
# `/images/me.jpg` is supplied, then the result could be, `me.jpg`,
# `images/me.jpg` or `../../images/me.jpg` depending on whether the current
# page lives in `/images`, `/` or `/sub/dir/` respectively.
#
# input - a path relative to the project root
#
# Returns the supplied path relativized to the current page.
# see https://github.com/jekyll/jekyll/issues/6360 and https://github.com/jekyll/jekyll/pull/6362
require 'pathname'

module Jekyll
  module UrlRelativizer
    def relativize_url(url)
      return if url.nil?
      return url if url.start_with?('http:', 'https:', 'mailto:', '//')
      url = ensure_leading_slash(url)
      pageUrl = @context.registers[:page]["url"]
      pageDir = Pathname(pageUrl).parent
      Pathname(url).relative_path_from(pageDir).to_s
    end
  end
end

Liquid::Template.register_filter(Jekyll::UrlRelativizer)
