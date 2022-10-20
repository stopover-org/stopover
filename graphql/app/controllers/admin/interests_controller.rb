
class Admin::InterestsController < AdminController
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
    tmpFile = FilesSupport.base64_to_file(params[:images][0][:src]) if params[:images][0]
    interest.preview.attach(tmpFile) if tmpFile
    interest.preview.purge unless tmpFile
    interest.update!(**update_interest_params)
    render json: interest, serializer: AdminInterestsSerializer
  end

  private

  def update_interest_params
    params.permit(:title, :slug)
  end
end