import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

interface SdkQuickstartProps {
  t: {
    copyBtn: string;
    copied: string;
  };
}

export const SdkQuickstart: React.FC<SdkQuickstartProps> = ({ t }) => {
  const [activeLang, setActiveLang] = useState<'ts' | 'py' | 'go' | 'rust' | 'curl'>('ts');
  const [copied, setCopied] = useState(false);

  const snippets: Record<string, string> = {
    ts: `import { VaultClient } from '@vault/sovereign-sdk';

// 1. Initialize Sovereign MPC Vault Client
const vault = new VaultClient({
  apiKey: process.env.VAULT_API_KEY,
  enclaveEndpoint: 'https://enclave.zurich.vault.io/v3',
  quorumPolicy: '3-of-5-mpc'
});

// 2. Propose high-value treasury settlement
const tx = await vault.treasury.transfer({
  sourceVaultId: 'vault_prod_treasury_01',
  destination: '0x71C...8491',
  amount: '1,500,000.00',
  asset: 'USDC',
  metadata: { purpose: 'Tier-1 OTC Liquidity Settlement' }
});

console.log(\`MPC Signing Ceremony Completed in \${tx.signingLatencyMs}ms:\`, tx.signatureDer);`,

    py: `from vault import VaultClient
import os

# 1. Initialize Sovereign Client
client = VaultClient(
    api_key=os.getenv("VAULT_API_KEY"),
    enclave_cluster="eu-central-swiss"
)

# 2. Initiate MPC multi-party signing session
session = client.mpc.create_signing_ceremony(
    vault_id="v_sovereign_cold_01",
    payload_hash="0x8f19ac77b102...",
    curve="secp256k1"
)

print(f"Quorum status: {session.status} | DER Signature: {session.signature}")`,

    go: `package main

import (
	"context"
	"fmt"
	"github.com/vault/sovereign-go/v3"
)

func main() {
	client := vault.NewClient(vault.Config{
		APIKey: "v_sec_live_9941a",
		Enclave: "swiss-tier4-hsm",
	})

	tx, err := client.InitiateMPCTransfer(context.Background(), &vault.TransferRequest{
		VaultID: "v_eth_reserve_pool",
		Asset:   "ETH",
		Amount:  "450.00",
	})
	if err != nil {
		panic(err)
	}

	fmt.Printf("Broadcasted with ZK-Proof: %s in %dms\\n", tx.TxHash, tx.LatencyMs)
}`,

    rust: `use vault_sovereign_sdk::{VaultClient, ShardCluster, TransferPayload};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std.error::Error>> {
    let client = VaultClient::builder()
        .api_key(std::env::var("VAULT_API_KEY")?)
        .cluster(ShardCluster::SwissZurichEnclave)
        .build()?;

    let signature = client.execute_mpc_signing(
        "v_btc_cold_storage",
        TransferPayload::new("BTC", "32.5", "bc1q...")
    ).await?;

    println!("TSS Shard Consensus Reached: {:?}", signature);
    Ok(())
}`,

    curl: `curl -X POST https://enclave.zurich.vault.io/v3/treasury/transfer \\
  -H "Authorization: Bearer $VAULT_SOVEREIGN_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "vault_id": "v_sovereign_treasury_01",
    "asset": "BTC",
    "amount": "25.0",
    "destination": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "quorum": "3-of-5-mpc"
  }'`
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(snippets[activeLang]);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="sdk-hub-card">
      <div className="sdk-header">
        <div className="flex items-center gap-2">
          <Code2 className="text-emerald-400 w-5 h-5" />
          <h3 className="text-lg font-bold text-white tracking-tight">Institutional Developer SDK & REST API</h3>
        </div>

        <div className="sdk-lang-tabs">
          {(['ts', 'py', 'go', 'rust', 'curl'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`sdk-tab-btn ${activeLang === lang ? 'active' : ''}`}
            >
              {lang === 'ts' ? 'TypeScript' : lang === 'py' ? 'Python' : lang === 'go' ? 'Go' : lang === 'rust' ? 'Rust' : 'cURL'}
            </button>
          ))}
        </div>
      </div>

      <div className="sdk-code-wrapper">
        <button onClick={handleCopy} className="sdk-copy-action-btn" title="Copy code">
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">{t.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copyBtn}</span>
            </>
          )}
        </button>

        <pre className="sdk-code-box font-mono text-xs">
          <code>{snippets[activeLang]}</code>
        </pre>
      </div>
    </div>
  );
};
