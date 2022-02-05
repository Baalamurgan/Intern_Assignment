package endpoint

import (
	"context"
	endpoint "github.com/go-kit/kit/endpoint"
	service "users/pkg/service"
)

// SignupRequest collects the request parameters for the Signup method.
type SignupRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignupResponse collects the response parameters for the Signup method.
type SignupResponse struct {
	E0 error `json:"e0"`
}

// MakeSignupEndpoint returns an endpoint that invokes Signup on the service.
func MakeSignupEndpoint(s service.UsersService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(SignupRequest)
		e0 := s.Signup(ctx, req.Email, req.Password)
		return SignupResponse{E0: e0}, nil
	}
}

// Failed implements Failer.
func (r SignupResponse) Failed() error {
	return r.E0
}

// UpdateRequest collects the request parameters for the Update method.
type UpdateRequest struct {
	UserId    string `json:"user_id"`
	ContentId string `json:"content_id"`
}

// UpdateResponse collects the response parameters for the Update method.
type UpdateResponse struct {
	E0 error `json:"e0"`
}

// MakeUpdateEndpoint returns an endpoint that invokes Update on the service.
func MakeUpdateEndpoint(s service.UsersService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(UpdateRequest)
		e0 := s.Update(ctx, req.UserId, req.ContentId)
		return UpdateResponse{E0: e0}, nil
	}
}

// Failed implements Failer.
func (r UpdateResponse) Failed() error {
	return r.E0
}

// Failure is an interface that should be implemented by response types.
// Response encoders can check if responses are Failer, and if so they've
// failed, and if so encode them using a separate write path based on the error.
type Failure interface {
	Failed() error
}

// Signup implements Service. Primarily useful in a client.
func (e Endpoints) Signup(ctx context.Context, email string, password string) (e0 error) {
	request := SignupRequest{
		Email:    email,
		Password: password,
	}
	response, err := e.SignupEndpoint(ctx, request)
	if err != nil {
		return
	}
	return response.(SignupResponse).E0
}

// Update implements Service. Primarily useful in a client.
func (e Endpoints) Update(ctx context.Context, userId string, contentId string) (e0 error) {
	request := UpdateRequest{
		ContentId: contentId,
		UserId:    userId,
	}
	response, err := e.UpdateEndpoint(ctx, request)
	if err != nil {
		return
	}
	return response.(UpdateResponse).E0
}
