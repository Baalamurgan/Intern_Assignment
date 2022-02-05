package service

import "context"

// UsersService describes the service.
type UsersService interface {
	// Add your methods here
	// e.x: Foo(ctx context.Context,s string)(rs string, err error)
	Signup(ctx context.Context, email string, password string) error
	Update(ctx context.Context, userId string, contentId string) error
}

type basicUsersService struct{}

func (b *basicUsersService) Signup(ctx context.Context, email string, password string) (e0 error) {
	// TODO implement the business logic of Signup
	return e0
}
func (b *basicUsersService) Update(ctx context.Context, userId string, contentId string) (e0 error) {
	// TODO implement the business logic of Update
	return e0
}

// NewBasicUsersService returns a naive, stateless implementation of UsersService.
func NewBasicUsersService() UsersService {
	return &basicUsersService{}
}

// New returns a UsersService with all of the expected middleware wired in.
func New(middleware []Middleware) UsersService {
	var svc UsersService = NewBasicUsersService()
	for _, m := range middleware {
		svc = m(svc)
	}
	return svc
}
