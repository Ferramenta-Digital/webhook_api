terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

provider "google" {
  credentials = var.gcp_key_file

  project = var.gcp_project_id
  region  = var.gcp_region
  zone    = var.gcp_zone
}

data "google_project" "project" {
  provider = google
}
