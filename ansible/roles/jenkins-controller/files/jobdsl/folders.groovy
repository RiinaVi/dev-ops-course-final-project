// Файл конфігурації директорій у Jenkins

folder('docker') {
    displayName('docker')
    description('Docker image build')
}

folder('infrastructure') {
    displayName('infrastructure')
    description('Infrastructure pipelines')
}

folder('ansible') {
    displayName('ansible')
    description('Configuration pipelines')
}

folder('application') {
    displayName('application')
    description('application pipelines')
}
