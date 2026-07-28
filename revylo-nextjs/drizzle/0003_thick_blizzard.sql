CREATE INDEX "categories_isActive_idx" ON "categories" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "categories_isFeatured_idx" ON "categories" USING btree ("isFeatured");--> statement-breakpoint
CREATE INDEX "categories_displayOrder_idx" ON "categories" USING btree ("displayOrder");--> statement-breakpoint
CREATE INDEX "colorSwatches_isActive_idx" ON "colorSwatches" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "colorSwatches_displayOrder_idx" ON "colorSwatches" USING btree ("displayOrder");--> statement-breakpoint
CREATE INDEX "testimonials_isActive_idx" ON "testimonials" USING btree ("isActive");--> statement-breakpoint
CREATE INDEX "testimonials_displayOrder_idx" ON "testimonials" USING btree ("displayOrder");