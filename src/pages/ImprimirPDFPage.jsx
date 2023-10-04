import React from 'react'
import { Document, PDFViewer, Page, Text, View } from '@react-pdf/renderer'

function ImprimirPDFPage() {
  return (
    
    <PDFViewer style={{width: "100%", height: "90vh"}}>
      <Document>
        <Page size="A4">
            <View>
                <Text>hola a todos, esto se va a imprimir</Text>
            </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default ImprimirPDFPage