class QuestionGroup < ActiveRecord::Base
  has_many :questions
  validates_presence_of :name
  acts_as_tree order: :name

  before_destroy :prevent_root_node_destroy
  after_destroy :move_orphans_to_parent

  def to_s
    self.to_json
  end

  private
  def prevent_root_node_destroy
    if self.parent.nil?
      false
    end
  end

  # when a QuestionGroup is destroyed, instead of destroying
  # all Questions (and Answers) in that group, move them to
  # the parent group; note that we should not be able to destroy
  # a QuestionGroup without a parent (see :prevent_root_node_destroy)
  def move_orphans_to_parent
    orphan_questions = Question.where(question_group_id: self.id)
    orphan_questions.update_all(question_group_id: self.parent.id)
  end
end
