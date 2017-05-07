module TagHelper

  def expand_tag(tag)
    expanded_tags.fetch(tag, tag)
  end

  def expand_tags(tags)
    tags&.map {|t| expand_tag(t) }
  end

  def get_skill_level_tags(tags)
    tags ? %w(culture beginner intermediate).find_all {|t| tags.include?(t)} : []
  end

private

  def expanded_tags
    {
      'tutorial' => 'hands-on',
    }
  end

end
