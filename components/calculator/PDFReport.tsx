import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink, Font } from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { VehicleDetails, HiddenCosts } from '@/types/calculator.types';

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottom: '2 solid #3b82f6',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1f2937',
    backgroundColor: '#f3f4f6',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingVertical: 3,
  },
  label: {
    fontSize: 11,
    color: '#4b5563',
    flex: 1,
  },
  value: {
    fontSize: 11,
    color: '#1f2937',
    fontWeight: 'semibold',
    textAlign: 'right',
    minWidth: 100,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTop: '1 solid #e5e7eb',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#6b7280',
  },
  disclaimer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fef3c7',
    borderRadius: 5,
  },
  disclaimerText: {
    fontSize: 9,
    color: '#92400e',
  },
  vehicleInfo: {
    backgroundColor: '#eff6ff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  vehicleInfoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  vehicleInfoLabel: {
    fontSize: 10,
    color: '#1e40af',
    width: 100,
  },
  vehicleInfoValue: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: 'semibold',
  },
});

// PDF Document Component
const ImportCalculationPDF = ({ 
  vehicleDetails, 
  costs, 
  country,
  totalCost 
}: { 
  vehicleDetails: VehicleDetails;
  costs: HiddenCosts;
  country: any;
  totalCost: number;
}) => {
  const formatCurrency = (amount: number) => {
    return `${country.symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Vehicle Import Cost Report</Text>
          <Text style={styles.subtitle}>Generated on {currentDate} | ImportCalc SADC</Text>
        </View>

        {/* Vehicle Information */}
        <View style={styles.vehicleInfo}>
          <View style={styles.vehicleInfoRow}>
            <Text style={styles.vehicleInfoLabel}>Vehicle:</Text>
            <Text style={styles.vehicleInfoValue}>
              {vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model}
            </Text>
          </View>
          <View style={styles.vehicleInfoRow}>
            <Text style={styles.vehicleInfoLabel}>Engine Size:</Text>
            <Text style={styles.vehicleInfoValue}>{vehicleDetails.engineSize}cc</Text>
          </View>
          <View style={styles.vehicleInfoRow}>
            <Text style={styles.vehicleInfoLabel}>Mileage:</Text>
            <Text style={styles.vehicleInfoValue}>{vehicleDetails.mileage.toLocaleString()} km</Text>
          </View>
          <View style={styles.vehicleInfoRow}>
            <Text style={styles.vehicleInfoLabel}>Country:</Text>
            <Text style={styles.vehicleInfoValue}>{country.name} ({country.currency})</Text>
          </View>
        </View>

        {/* Japan Costs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Japan Costs (8 fees)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Vehicle Price (FOB)</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.vehiclePrice)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Auction Fee</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.auctionFee)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transport to Port</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.transportToPort)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Export Certificate</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.exportCertificate)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Radiation Inspection</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.radiationInspection)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pre-Export Inspection</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.preExportInspection)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Agent Commission</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.agentCommission)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Export Customs Clearance</Text>
            <Text style={styles.value}>{formatCurrency(costs.japanCosts.exportCustomsClearance)}</Text>
          </View>
        </View>

        {/* Shipping Costs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Costs (5 fees)</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Ocean Freight</Text>
            <Text style={styles.value}>{formatCurrency(costs.shippingCosts.oceanFreight)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bunker Adjustment Factor</Text>
            <Text style={styles.value}>{formatCurrency(costs.shippingCosts.bunkerAdjustmentFactor)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Bill of Lading Fee</Text>
            <Text style={styles.value}>{formatCurrency(costs.shippingCosts.billOfLadingFee)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Shipping Insurance</Text>
            <Text style={styles.value}>{formatCurrency(costs.shippingCosts.shippingInsurance)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Terminal Handling (Japan)</Text>
            <Text style={styles.value}>{formatCurrency(costs.shippingCosts.terminalHandlingJapan)}</Text>
          </View>
        </View>

        {/* Destination Costs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destination Port & Government Fees</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Import VAT</Text>
            <Text style={styles.value}>{formatCurrency(costs.namibiaCosts.importVAT)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Customs Duty</Text>
            <Text style={styles.value}>{formatCurrency(costs.namibiaCosts.customsDuty)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Terminal Handling</Text>
            <Text style={styles.value}>{formatCurrency(costs.namibiaCosts.terminalHandlingNamibia)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Clearing Agent Fee</Text>
            <Text style={styles.value}>{formatCurrency(costs.namibiaCosts.clearingAgentFee)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transport Inland</Text>
            <Text style={styles.value}>{formatCurrency(costs.namibiaCosts.transportToWindhoek)}</Text>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>TOTAL IMPORT COST</Text>
          <Text style={styles.totalValue}>{formatCurrency(totalCost)}</Text>
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerText}>
            IMPORTANT: This calculation is an estimate based on current rates and regulations. 
            Actual costs may vary. Always verify with official sources and licensed import agents.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          ImportCalc SADC | support@importcalc.africa | Save thousands on your import
        </Text>
      </Page>
    </Document>
  );
};

// Export Component with Download Button
interface PDFExportButtonProps {
  vehicleDetails: VehicleDetails;
  costs: HiddenCosts;
  country: any;
  totalCost: number;
  disabled?: boolean;
}

export function PDFExportButton({ 
  vehicleDetails, 
  costs, 
  country, 
  totalCost,
  disabled = false 
}: PDFExportButtonProps) {
  if (!vehicleDetails.make || !vehicleDetails.model || costs.japanCosts.vehiclePrice === 0) {
    return (
      <Button disabled variant="outline" className="flex-1">
        <Download className="w-4 h-4 mr-2" />
        Enter vehicle details to export
      </Button>
    );
  }

  const fileName = `import-calculation-${vehicleDetails.make}-${vehicleDetails.model}-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <PDFDownloadLink
      document={
        <ImportCalculationPDF 
          vehicleDetails={vehicleDetails}
          costs={costs}
          country={country}
          totalCost={totalCost}
        />
      }
      fileName={fileName}
    >
      {({ blob, url, loading, error }) => (
        <Button 
          disabled={loading || disabled} 
          variant="outline" 
          className="flex-1"
        >
          <Download className="w-4 h-4 mr-2" />
          {loading ? 'Generating PDF...' : 'Export PDF Report'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}