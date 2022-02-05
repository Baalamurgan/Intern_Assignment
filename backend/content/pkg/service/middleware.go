package service

import (
	"context"
	log "github.com/go-kit/kit/log"
)

// Middleware describes a service middleware.
type Middleware func(ContentService) ContentService

type loggingMiddleware struct {
	logger log.Logger
	next   ContentService
}

// LoggingMiddleware takes a logger as a dependency
// and returns a ContentService Middleware.
func LoggingMiddleware(logger log.Logger) Middleware {
	return func(next ContentService) ContentService {
		return &loggingMiddleware{logger, next}
	}

}

func (l loggingMiddleware) Create(ctx context.Context, content string, title string) (e0 error) {
	defer func() {
		l.logger.Log("method", "Create", "content", content, "title", title, "e0", e0)
	}()
	return l.next.Create(ctx, content, title)
}
func (l loggingMiddleware) GetContents(ctx context.Context) (e0 error) {
	defer func() {
		l.logger.Log("method", "GetContents", "e0", e0)
	}()
	return l.next.GetContents(ctx)
}
