$ErrorActionPreference = 'Stop'
$taskDocPath = 'C:\Users\HP\Documents\foster\TP\KAZALO_wilfride_rattrapage_MGT202.docx'
$taskPdfPath = 'C:\Users\HP\Documents\foster\TP\KAZALO_wilfride_rattrapage_MGT202.pdf'
$taskWord = $null
$taskDoc = $null
try {
    $taskWord = New-Object -ComObject Word.Application
    $taskWord.Visible = $false
    $taskWord.DisplayAlerts = 0
    $taskDoc = $taskWord.Documents.Open($taskDocPath, $false, $true)
    $taskDoc.Repaginate()
    $taskDoc.ExportAsFixedFormat($taskPdfPath, 17)
    Write-Output ('Pages: ' + $taskDoc.ComputeStatistics(2))
    Write-Output $taskPdfPath
}
finally {
    if ($null -ne $taskDoc) {
        $taskDoc.Close(0)
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskDoc)
    }
    if ($null -ne $taskWord) {
        $taskWord.Quit()
        [void][Runtime.InteropServices.Marshal]::ReleaseComObject($taskWord)
    }
}
