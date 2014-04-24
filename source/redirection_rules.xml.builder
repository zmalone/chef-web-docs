xml.RoutingRules do
  data.redirection_rules.each do |old, new|
    new = URI.parse(new)
    ['/', '/index.html'].each do |ext|
      xml.RoutingRule do
        xml.Condition do
          xml.KeyPrefixEquals "#{old}#{ext}"
        end
        xml.Redirect do
          unless new.relative?
            xml.HostName new.host
          end
          xml.ReplaceKeyPrefixWith "#{new.path[1..-1]}#{'#' + new.fragment if new.fragment.present?}"
        end
      end
    end
  end
end
