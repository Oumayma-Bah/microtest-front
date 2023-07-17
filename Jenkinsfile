pipeline
{
    agent any
    stages {
        stage('Pull') {
            steps{
                script{
                    checkout([$class: 'GitSCM', branches: [[name: '*/main']],
                        userRemoteConfigs: [[
                            credentialsId: 'b746e1b5-725b-4f40-8058-804123acf9aa',
                            url: 'https://github.com/Oumayma-Bah/microtest-front.git'
                        ]]])
                }
            }
        }
    }
}