using Budget4Home.Api.Models;

namespace Budget4Home.Api.Features.Labels.GetLabels;

public class GetLabelsResponse
{
    public ICollection<LabelResponse> Labels { get; set; }
}