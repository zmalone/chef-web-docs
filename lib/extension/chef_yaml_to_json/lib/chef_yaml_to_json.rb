# Require core library
require 'middleman-core'


# Extension namespace
class ChefYmlToJson < ::Middleman::Extension
  option :my_option, 'default', 'An example option'

  def initialize(app, options_hash={}, &block)
    # Call super to build options from the options_hash
    super

    # Require libraries only when activated
    # require 'necessary/library'

    # set up your extension
    # puts options.my_option
  end
  def chef_yaml_json
    input_filename = app.config[:root_dir] +"/" + app.config[:data_dir] + '/tracks.yml'
    output_filename = app.config[:root_dir] +"/source/" + app.config[:js_dir] + '/data/track.js'

    input_file = File.open(input_filename, 'r')
    input_yml = input_file.read
    input_file.close

    output_json = JSON.dump(YAML::load(input_yml))
    output_json = 'var tracks = ' + output_json
    output_file = File.open(output_filename, 'w+')
    output_file.write(output_json)
    output_file.close
  end

  def after_configuration
    require 'json'
    require 'yaml'
    chef_yaml_json
  end

  # A Sitemap Manipulator
  # def manipulate_resource_list(resources)
  # end

  # module do
  #   def a_helper
  #   end
  # end
end

# Register extensions which can be activated
# Make sure we have the version of Middleman we expect
# Name param may be omited, it will default to underscored
# version of class name

ChefYmlToJson.register(:chef_yml_to_json)
