using Budget4Home.Api.Models;

namespace Budget4Home.Api.Features.Users.GetUsers;

public class GetUsersResponse
{
    public ICollection<UserResponse> Users { get; set; }
}