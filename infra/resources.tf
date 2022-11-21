resource "google_project_service" "gcp_resource_manager_api" {
  service = "cloudresourcemanager.googleapis.com"

  disable_on_destroy = false
}
resource "google_project_service" "compute_api" {
  service = "compute.googleapis.com"

  disable_on_destroy = false
}
resource "google_project_service" "run_api" {
  service = "run.googleapis.com"

  disable_on_destroy = false
}


resource "google_cloud_run_service" "create_cloud_run" {
  name                       = var.service_name
  location                   = var.gcp_region
  autogenerate_revision_name = true


  template {
    spec {
      container_concurrency = local.settings.containerConcurrency
      service_account_name  = "${data.google_project.project.number}-compute@developer.gserviceaccount.com"

      timeout_seconds = local.settings.timeoutSeconds
      containers {
        image = var.gcp_project_image

        resources {
          limits = {
            cpu    = local.settings.maxCPU
            memory = local.settings.maxMemory
          }
        }

        env {
          name  = "NODE_ENV"
          value = var.NODE_ENV
        }
        env {
          name  = "DATABASE_URL"
          value = var.ENV_DATABASE_URL
        }
        env {
          name  = "JWT_SECRET_KEY"
          value = var.ENV_JWT_SECRET_KEY
        }
        env {
          name  = "MAIL_HOST"
          value = var.ENV_MAIL_HOST
        }
        env {
          name  = "MAIL_USER"
          value = var.ENV_MAIL_USER
        }
        env {
          name  = "MAIL_PASSWORD"
          value = var.ENV_MAIL_PASSWORD
        }
        env {
          name  = "MAIL_FROM"
          value = var.ENV_MAIL_FROM
        }
      }
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = local.settings.maxScale
        "autoscaling.knative.dev/minScale" = local.settings.minScale
      }
    }
  }

  metadata {
    labels = {
      project     = var.service_name
      environment = var.NODE_ENV
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  lifecycle {
    ignore_changes = [
      metadata.0.annotations,
      metadata.0.labels
    ]
  }

}

data "google_iam_policy" "noauth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "noauth" {
  location = google_cloud_run_service.create_cloud_run.location
  project  = google_cloud_run_service.create_cloud_run.project
  service  = google_cloud_run_service.create_cloud_run.name

  policy_data = data.google_iam_policy.noauth.policy_data
}


resource "google_cloud_run_domain_mapping" "api_domain" {
  location = var.gcp_region
  name     = var.domain_service

  metadata {
    namespace = var.gcp_project_id
    labels = {
      project     = var.service_name
      environment = var.NODE_ENV
    }
  }

  spec {
    route_name = google_cloud_run_service.create_cloud_run.name
  }
}