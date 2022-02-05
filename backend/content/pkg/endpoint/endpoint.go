package endpoint

import (
	service "content/pkg/service"
	"context"
	endpoint "github.com/go-kit/kit/endpoint"
)

// CreateRequest collects the request parameters for the Create method.
type CreateRequest struct {
	Content string `json:"content"`
	Title   string `json:"title"`
}

// CreateResponse collects the response parameters for the Create method.
type CreateResponse struct {
	E0 error `json:"e0"`
}

// MakeCreateEndpoint returns an endpoint that invokes Create on the service.
func MakeCreateEndpoint(s service.ContentService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(CreateRequest)
		e0 := s.Create(ctx, req.Content, req.Title)
		return CreateResponse{E0: e0}, nil
	}
}

// Failed implements Failer.
func (r CreateResponse) Failed() error {
	return r.E0
}

// GetContentsRequest collects the request parameters for the GetContents method.
type GetContentsRequest struct{}

// GetContentsResponse collects the response parameters for the GetContents method.
type GetContentsResponse struct {
	E0 error `json:"e0"`
}

// MakeGetContentsEndpoint returns an endpoint that invokes GetContents on the service.
func MakeGetContentsEndpoint(s service.ContentService) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		e0 := s.GetContents(ctx)
		return GetContentsResponse{E0: e0}, nil
	}
}

// Failed implements Failer.
func (r GetContentsResponse) Failed() error {
	return r.E0
}

// Failure is an interface that should be implemented by response types.
// Response encoders can check if responses are Failer, and if so they've
// failed, and if so encode them using a separate write path based on the error.
type Failure interface {
	Failed() error
}

// Create implements Service. Primarily useful in a client.
func (e Endpoints) Create(ctx context.Context, content string, title string) (e0 error) {
	request := CreateRequest{
		Content: content,
		Title:   title,
	}
	response, err := e.CreateEndpoint(ctx, request)
	if err != nil {
		return
	}
	return response.(CreateResponse).E0
}

// GetContents implements Service. Primarily useful in a client.
func (e Endpoints) GetContents(ctx context.Context) (e0 error) {
	request := GetContentsRequest{}
	response, err := e.GetContentsEndpoint(ctx, request)
	if err != nil {
		return
	}
	return response.(GetContentsResponse).E0
}
