node {
    stage('Build Environment') {
        sh 'docker-compose up -d'
    }
    stage('Test'){
        sh 'movie-service-test'
    }
    stage('Destroy'){
        sh 'docker-compose down'
    }
}