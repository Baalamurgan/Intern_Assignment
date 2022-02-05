package service

import (
	"context"
	log "github.com/go-kit/kit/log"
)

// Middleware describes a service middleware.
type Middleware func(UsersService) UsersService

type loggingMiddleware struct {
	logger log.Logger
	next   UsersService
}

// LoggingMiddleware takes a logger as a dependency
// and returns a UsersService Middleware.
func LoggingMiddleware(logger log.Logger) Middleware {
	return func(next UsersService) UsersService {
		return &loggingMiddleware{logger, next}
	}

}

func (l loggingMiddleware) Signup(ctx context.Context, email string, password string) (e0 error) {
	defer func() {
		l.logger.Log("method", "Signup", "email", email, "password", password, "e0", e0)
	}()
	return l.next.Signup(ctx, email, password)
}
func (l loggingMiddleware) Update(ctx context.Context, userId string, contentId string) (e0 error) {
	defer func() {
		l.logger.Log("method", "Update", "userId", userId, "contentId", contentId, "e0", e0)
	}()
	return l.next.Update(ctx, userId, contentId)
}
