class DceLtiController < ApplicationController
  before_action :configure_permitted_parameters, if: :devise_controller?

  before_filter :authenticate_via_lti
  helper_method :current_user, :course

end


