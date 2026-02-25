# Mata processos Next.js / node que estao segurando a porta 3000 ou o lock do dev
Write-Host "Procurando processos na porta 3000..." -ForegroundColor Yellow
$conn = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($conn) {
    foreach ($c in $conn) {
        $pid = $c.OwningProcess
        $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
        if ($proc) {
            Write-Host "Encerrando PID $pid ($($proc.ProcessName))..." -ForegroundColor Red
            Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        }
    }
    Write-Host "Pronto. Rode: npm run dev" -ForegroundColor Green
} else {
    Write-Host "Nenhum processo na porta 3000. Tentando encerrar processos node.exe..." -ForegroundColor Yellow
    Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host "Pronto. Rode: npm run dev" -ForegroundColor Green
}
