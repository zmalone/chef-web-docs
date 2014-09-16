module FeatureHelpers
  
  def feature?(key)
    @features ||= ENV['FEATURES'].to_s.split(',').map { |f| { f.strip.to_sym => true } }.reduce({}, :merge)
    @features[key.to_sym] || false
  end

  def provisioner
    ENV['PROVISIONER'] || 'cloudshare'
  end

end