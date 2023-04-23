# frozen_string_literal: true

module Admin
  class InterestsController < AdminController
    def index
      interests = Interest.all.reorder(get_user_order)
      paginate json: interests, each_serializer: AdminInterestsSerializer
    end

    def show
      interest = Interest.find(params[:id])

      render json: interest, serializer: AdminInterestsSerializer
    end

    def update
      interest = Interest.find(params[:id])
      tmp_file = Stopover::FilesSupport.base64_to_file(params[:images][0][:src]) if params[:images][0]
      interest.preview.attach(tmp_file) if tmp_file
      interest.preview.purge unless tmp_file
      interest.update!(**update_interest_params)
      render json: interest, serializer: AdminInterestsSerializer
    end

    private

    def update_interest_params
      params.permit(:title, :slug)
    end
  end
end
