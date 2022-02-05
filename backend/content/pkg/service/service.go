package service

import "context"

// ContentService describes the service.
type ContentService interface {
	// Add your methods here
	// e.x: Foo(ctx context.Context,s string)(rs string, err error)
	Create(ctx context.Context, content string, title string) error
	GetContents(ctx context.Context) error
}

type basicContentService struct{}

func (b *basicContentService) Create(ctx context.Context, content string, title string) (e0 error) {
	// TODO implement the business logic of Create
	return e0
}
func (b *basicContentService) GetContents(ctx context.Context) (e0 error) {
	// TODO implement the business logic of GetContents
	return e0
}

// NewBasicContentService returns a naive, stateless implementation of ContentService.
func NewBasicContentService() ContentService {
	return &basicContentService{}
}

// New returns a ContentService with all of the expected middleware wired in.
func New(middleware []Middleware) ContentService {
	var svc ContentService = NewBasicContentService()
	for _, m := range middleware {
		svc = m(svc)
	}
	return svc
}
